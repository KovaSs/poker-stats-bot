import "./mocks/telegram"; // моки первыми

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
  init as initSDK,
  initData,
  expandViewport,
  viewport,
  miniApp,
  themeParams,
  swipeBehavior,
  backButton,
} from "@telegram-apps/sdk-react";

import App from "./App";
import "./index.css";

// Инициализируем SDK однократно до монтирования React
initSDK();
initData.restore(); // восстанавливаем initData из окружения (или моков)

// Монтируем UI-компоненты Telegram
expandViewport();
viewport
  .mount()
  .then(() => {
    viewport.bindCssVars();
    miniApp.bindCssVars();
    themeParams.bindCssVars();
    viewport.requestFullscreen();
    swipeBehavior.disableVertical();
  })
  .catch(console.error);

if (backButton.isSupported()) {
  backButton.mount();
}

// Теперь монтируем React-приложение
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
