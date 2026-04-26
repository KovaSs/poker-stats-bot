import "./mocks/telegram"; // самый первый импорт

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

initSDK();
initData.restore();

// Монтируем UI-компоненты
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
