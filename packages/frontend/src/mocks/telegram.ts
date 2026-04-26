import { mockTelegramEnv } from "@telegram-apps/sdk-react";

// Включаем мок только в режиме разработки и если не запущено внутри Telegram.
if (import.meta.env.DEV && !window.Telegram?.WebApp) {
  mockTelegramEnv({
    launchParams: {
      tgWebAppPlatform: "ios", // или "android", "web"
      tgWebAppVersion: "7.2", // версия API
      tgWebAppThemeParams: {
        bg_color: "#ffffff",
        text_color: "#000000",
        hint_color: "#aaaaaa",
        link_color: "#2481cc",
        button_color: "#2481cc",
        button_text_color: "#ffffff",
      },
    },
    initData: {
      query_id: "dev_query",
      user: {
        id: 12345,
        first_name: "Dev",
        last_name: "User",
        username: "devuser",
        language_code: "en",
      },
      // 👇 Вот правильное место для данных о чате
      chat: {
        id: 123456789, // ваш тестовый ID группы
        type: "supergroup",
        title: "Test Chat",
      },
      auth_date: Math.floor(Date.now() / 1000),
      hash: "dev_hash",
    },
  });
}
