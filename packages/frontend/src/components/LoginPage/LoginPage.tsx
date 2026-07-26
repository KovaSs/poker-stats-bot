import { useCallback, useState } from "react";

import { useAuth } from "../AuthProvider";

const VK_APP_ID = 54685122;

let sdkInited = false;

function ensureSDK(): boolean {
  if (sdkInited) return true;
  const VKID = window.VKIDSDK;
  if (!VKID) return false;
  try {
    VKID.Config.init({
      responseMode: VKID.ConfigResponseMode.Callback,
      redirectUrl: window.location.origin,
      source: VKID.ConfigSource.LOWCODE,
      app: VK_APP_ID,
      scope: "",
    });
    sdkInited = true;
    return true;
  } catch {
    return false;
  }
}

export function useVkFloatingOneTap() {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const show = useCallback(() => {
    setError(null);

    const VKID = window.VKIDSDK;
    if (!VKID || !ensureSDK()) {
      setError("VK ID SDK недоступен. Попробуйте позже.");
      return;
    }

    const containerId = "vkid-floating-one-tap";
    if (document.getElementById(containerId)) return;

    const container = document.createElement("div");
    container.id = containerId;
    document.body.appendChild(container);

    try {
      const floatingOneTap = new VKID.FloatingOneTap();
      const widget = floatingOneTap.render({
        showAlternativeLogin: true,
        appName: "Poker club",
        scheme: "dark",
      });

      const cleanup = () => {
        widget.close();
        const el = document.getElementById(containerId);
        if (el) el.remove();
      };

      widget.on(VKID.WidgetEvents.ERROR, () => {
        cleanup();
        setError("Ошибка авторизации. Попробуйте снова.");
      });

      widget.on(
        VKID.FloatingOneTapInternalEvents.LOGIN_SUCCESS,
        async (payload: unknown) => {
          const data = payload as { code?: string; data?: { code?: string } };
          const code = data?.code || data?.data?.code;
          if (!code) return;
          try {
            const res = await fetch("/api/auth/vk", {
              body: JSON.stringify({ redirect_uri: window.location.origin, code }),
              headers: { "Content-Type": "application/json" },
              method: "POST",
            });
            if (!res.ok) throw new Error("Auth failed");
            const json = await res.json();
            await login(json.token);
            cleanup();
          } catch {
            cleanup();
            setError("Ошибка авторизации. Попробуйте снова.");
          }
        },
      );
    } catch {
      setError("Ошибка авторизации. Попробуйте снова.");
    }
  }, [login]);

  return { clearError, error, show };
}
