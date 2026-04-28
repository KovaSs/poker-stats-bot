import { mockTelegramEnv } from "@telegram-apps/sdk-react";

if (import.meta.env.DEV && !window.Telegram?.WebApp) {
  // Берём структуру реальных launchParams, но с тестовым пользователем
  const initDataObject = {
    user: {
      photo_url: "https://t.me/i/userpic/320/placeholder.svg", // необязательно
      allows_write_to_pm: true,
      username: "devuser",
      language_code: "en",
      first_name: "Dev",
      last_name: "User",
      id: 12345,
    },
    auth_date: Math.floor(Date.now() / 1000),
    chat_instance: "2355408681795264684",
    start_param: "chat_-1002491492186",
    signature: "mock_signature",
    chat_type: "supergroup",
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
      tgWebAppThemeParams: {
        section_header_text_color: "#6ab3f3",
        section_separator_color: "#111921",
        destructive_text_color: "#ec3942",
        subtitle_text_color: "#708499",
        bottom_bar_bg_color: "#17212b",
        secondary_bg_color: "#232e3c",
        accent_text_color: "#6ab2f2",
        button_text_color: "#ffffff",
        section_bg_color: "#17212b",
        header_bg_color: "#17212b",
        button_color: "#5288c1",
        hint_color: "#708499",
        text_color: "#f5f5f5",
        link_color: "#6ab3f3",
        bg_color: "#17212b",
      },
      tgWebAppStartParam: "chat_-1002491492186",
      tgWebAppPlatform: "tdesktop",
      tgWebAppData: initDataRaw,
      tgWebAppVersion: "9.6",
    },
  });

  // eslint-disable-next-line no-console
  console.info("⚠️ Мок Telegram окружения активирован (реальные темы)");
}
