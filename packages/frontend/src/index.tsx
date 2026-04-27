import "./mocks/telegram"; // самый первый импорт

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { createRoot } from "react-dom/client";
import { StrictMode, useState, useEffect } from "react";
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

import { App } from "./components";

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

function AppWithTheme() {
  const [theme, setTheme] = useState(
    createTheme({ palette: { mode: "dark" } }),
  );

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const newTheme = createTheme({
      palette: {
        mode: "dark",
        primary: {
          main:
            rootStyles.getPropertyValue("--tg-theme-button-color").trim() ||
            "#5288c1",
        },
        background: {
          default:
            rootStyles.getPropertyValue("--tg-theme-bg-color").trim() ||
            "#17212b",
          paper:
            rootStyles
              .getPropertyValue("--tg-theme-secondary-bg-color")
              .trim() || "#232e3c",
        },
        text: {
          primary:
            rootStyles.getPropertyValue("--tg-theme-text-color").trim() ||
            "#f5f5f5",
          secondary:
            rootStyles.getPropertyValue("--tg-theme-hint-color").trim() ||
            "#708499",
        },
      },
      typography: {
        fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
      },
    });
    setTheme(newTheme);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWithTheme />
  </StrictMode>,
);
