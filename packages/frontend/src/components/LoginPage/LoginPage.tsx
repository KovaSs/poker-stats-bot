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

export function useVkLogin() {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = useCallback(async () => {
    setError(null);

    const VKID = window.VKIDSDK;

    if (!VKID || !ensureSDK()) {
      // SDK not available — redirect to VK directly
      window.location.href =
        `https://id.vk.com/authorize?client_id=${VK_APP_ID}&redirect_uri=${encodeURIComponent(window.location.origin)}&response_type=code`;
      return;
    }

    try {
      const authResponse = await VKID.Auth.login();
      const tokenResult = await VKID.Auth.exchangeCode(
        authResponse.code,
        authResponse.device_id,
      );
      const res = await fetch("/api/auth/vk", {
        body: JSON.stringify({ vk_id: tokenResult.user_id }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      if (!res.ok) throw new Error("Auth failed");
      const data = await res.json();
      await login(data.token);
    } catch {
      // VK popup closed or SDK error — fallback to redirect
      window.location.href =
        `https://id.vk.com/authorize?client_id=${VK_APP_ID}&redirect_uri=${encodeURIComponent(window.location.origin)}&response_type=code`;
    }
  }, [login]);

  return { clearError: () => setError(null), handleLogin, error };
}
