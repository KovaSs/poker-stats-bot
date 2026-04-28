import "./mocks/telegram"; // самый первый импорт

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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

import { App, ErrorBoundary } from "./components";

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
  // eslint-disable-next-line no-console
  .catch(console.error);

if (backButton.isSupported()) {
  backButton.mount();
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // данные считаются свежими 5 минут
    },
  },
});

const AppWithTheme = () => {
  const [theme, setTheme] = useState(
    createTheme({ palette: { mode: "dark" } }),
  );

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const newTheme = createTheme({
      palette: {
        background: {
          paper:
            rootStyles
              .getPropertyValue("--tg-theme-secondary-bg-color")
              .trim() || "#232e3c",
          default:
            rootStyles.getPropertyValue("--tg-theme-bg-color").trim() ||
            "#17212b",
        },
        text: {
          secondary:
            rootStyles.getPropertyValue("--tg-theme-hint-color").trim() ||
            "#708499",
          primary:
            rootStyles.getPropertyValue("--tg-theme-text-color").trim() ||
            "#f5f5f5",
        },
        primary: {
          main:
            rootStyles.getPropertyValue("--tg-theme-button-color").trim() ||
            "#5288c1",
        },
        mode: "dark",
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
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <AppWithTheme />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
);
