import { mockTelegramEnv } from "@telegram-apps/sdk-react";

if (import.meta.env.DEV && !window.Telegram?.WebApp) {
  // Берём структуру реальных launchParams, но с тестовым пользователем
  const initDataObject = {
    user: {
      id: 12345,
      first_name: "Dev",
      last_name: "User",
      username: "devuser",
      language_code: "en",
      allows_write_to_pm: true,
      photo_url: "https://t.me/i/userpic/320/placeholder.svg", // необязательно
    },
    chat_instance: "2355408681795264684",
    chat_type: "supergroup",
    auth_date: Math.floor(Date.now() / 1000),
    signature: "mock_signature",
    hash: "mock_hash",
  };

  const initDataRaw = new URLSearchParams(
    Object.entries(initDataObject).map(([k, v]) => [
      k,
      typeof v === "string" ? v : JSON.stringify(v),
    ]),
  ).toString();

  mockTelegramEnv({
    launchParams: {
      tgWebAppData: initDataRaw,
      tgWebAppPlatform: "tdesktop",
      tgWebAppVersion: "9.6",
      tgWebAppThemeParams: {
        accent_text_color: "#6ab2f2",
        bg_color: "#17212b",
        bottom_bar_bg_color: "#17212b",
        button_color: "#5288c1",
        button_text_color: "#ffffff",
        destructive_text_color: "#ec3942",
        header_bg_color: "#17212b",
        hint_color: "#708499",
        link_color: "#6ab3f3",
        secondary_bg_color: "#232e3c",
        section_bg_color: "#17212b",
        section_header_text_color: "#6ab3f3",
        section_separator_color: "#111921",
        subtitle_text_color: "#708499",
        text_color: "#f5f5f5",
      },
    },
  });

  console.info("⚠️ Мок Telegram окружения активирован (реальные темы)");
}
