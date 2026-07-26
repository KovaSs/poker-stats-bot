import { useCallback, useEffect, useState } from "react";

import { useAuth } from "../AuthProvider";

const VK_APP_ID = 54685122;

function generateCodeVerifier(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789-._~";
  const array = new Uint8Array(64);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => chars[b % chars.length]).join("");
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function buildAuthUrl(codeChallenge: string): string {
    const params = new URLSearchParams({
      redirect_uri: window.location.origin,
      code_challenge_method: "S256",
      client_id: String(VK_APP_ID),
      code_challenge: codeChallenge,
      response_type: "code",
    });
  return `https://id.vk.com/authorize?${params}`;
}

const VERIFIER_KEY = "vk_code_verifier";

export function useVkAuth() {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const exchangeCode = useCallback(
    async (code: string, deviceId?: string): Promise<void> => {
      const codeVerifier = sessionStorage.getItem(VERIFIER_KEY);
      sessionStorage.removeItem(VERIFIER_KEY);
      const body: Record<string, string> = {
        code,
        redirect_uri: window.location.origin,
      };
      if (codeVerifier) body.code_verifier = codeVerifier;
      if (deviceId) body.device_id = deviceId;
      const res = await fetch("/api/auth/vk", {
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(errBody?.error || "Auth failed");
      }
      const json = await res.json();
      await login(json.token);
    },
    [login],
  );

  const handleLogin = useCallback(async () => {
    setError(null);

    try {
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);
      sessionStorage.setItem(VERIFIER_KEY, codeVerifier);

      const url = buildAuthUrl(codeChallenge);
      const popup = window.open(url, "vk-auth", "width=800,height=700");

      if (!popup) {
        window.location.href = url;
        return;
      }

      const result = await new Promise<{ code: string; deviceId?: string }>(
        (resolve, reject) => {
          const interval = setInterval(() => {
            if (popup.closed) {
              clearInterval(interval);
              reject(new Error("Popup closed"));
              return;
            }
            try {
              const popupUrl = popup.location.href;
              if (!popupUrl.startsWith(window.location.origin)) return;
              clearInterval(interval);
              const params = new URLSearchParams(
                new URL(popupUrl).search,
              );
              const code = params.get("code");
              if (code) {
                popup.close();
                const deviceId = params.get("device_id") || undefined;
                resolve({ code, deviceId });
              } else {
                popup.close();
                reject(new Error("No code in response"));
              }
            } catch {
              // cross-origin — popup still on VK domain
            }
          }, 300);

          setTimeout(() => {
            clearInterval(interval);
            popup.close();
            reject(new Error("Authorization timeout"));
          }, 120000);
        },
      );

      await exchangeCode(result.code, result.deviceId);
    } catch (err) {
      if (err instanceof Error && err.message === "Popup closed") {
        setError(null);
        return;
      }
      setError("Ошибка авторизации. Попробуйте снова.");
    }
  }, [exchangeCode]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code) return;
    const deviceId = params.get("device_id") || undefined;
    const codeVerifier = sessionStorage.getItem(VERIFIER_KEY);
    if (!codeVerifier) return;
    exchangeCode(code, deviceId)
      .then(() => {
        window.history.replaceState({}, "", window.location.pathname);
      })
      .catch(() => {});
  }, [exchangeCode]);

  return { clearError, error, exchangeCode, handleLogin };
}
