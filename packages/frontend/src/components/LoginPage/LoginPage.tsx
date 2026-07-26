import { useCallback, useState } from "react";

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

const VERIFIER_KEY = "vk_code_verifier";

export function useVkAuth() {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const handleLogin = useCallback(async () => {
    setError(null);
    try {
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);
      sessionStorage.setItem(VERIFIER_KEY, codeVerifier);
      const params = new URLSearchParams({
        client_id: String(VK_APP_ID),
        code_challenge: codeChallenge,
        code_challenge_method: "S256",
        redirect_uri: window.location.origin,
        response_type: "code",
      });
      window.location.href = `https://id.vk.com/authorize?${params}`;
    } catch {
      setError("Ошибка авторизации. Попробуйте снова.");
    }
  }, []);

  const exchangeCode = useCallback(
    async (code: string): Promise<void> => {
      const codeVerifier = sessionStorage.getItem(VERIFIER_KEY);
      sessionStorage.removeItem(VERIFIER_KEY);
      const body: Record<string, string> = {
        code,
        redirect_uri: window.location.origin,
      };
      if (codeVerifier) body.code_verifier = codeVerifier;
      const res = await fetch("/api/auth/vk", {
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      if (!res.ok) throw new Error("Auth failed");
      const json = await res.json();
      await login(json.token);
    },
    [login],
  );

  return { clearError, error, exchangeCode, handleLogin };
}
