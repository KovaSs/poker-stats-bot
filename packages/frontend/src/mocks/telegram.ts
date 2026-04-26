import { mockTelegramEnv } from "@telegram-apps/sdk-react";

if (import.meta.env.DEV && !window.Telegram?.WebApp) {
  // Строка initData в формате query-параметров
  const initDataRaw = new URLSearchParams([
    [
      "user",
      JSON.stringify({
        id: 12345,
        first_name: "Dev",
        last_name: "User",
        username: "devuser",
        language_code: "en",
      }),
    ],
    [
      "hash",
      "89d6079ad6762351f38c6dbbc41bb53048019256a9513988da70f1e9f68ff84e",
    ],
    ["auth_date", String(Math.floor(Date.now() / 1000))],
    ["chat_instance", "1234567890"],
    ["chat_type", "sender"],
    ["start_param", "debug"],
  ]).toString();

  mockTelegramEnv({
    // @ts-expect-error lol kek
    themeParams: {
      accentTextColor: "#6ab3f3",
      bgColor: "#17212b",
      buttonColor: "#5288c1",
      buttonTextColor: "#ffffff",
      destructiveTextColor: "#ec3942",
      headerBgColor: "#17212b",
      hintColor: "#708499",
      linkColor: "#6ab3f3",
      secondaryBgColor: "#232e3c",
      sectionBgColor: "#17212b",
      sectionHeaderTextColor: "#6ab3f3",
      subtitleTextColor: "#708499",
      textColor: "#f5f5f5",
    },
    initDataRaw, // <-- просто передаём строку
    version: "8",
    platform: "tdesktop",
  });

  console.info("⚠️ Мок Telegram окружения активирован");
}
