export {};

declare global {
  interface Window {
    VKIDSDK?: {
      Config: {
        init: (config: {
          app: number;
          redirectUrl: string;
          responseMode: string;
          source: string;
          scope: string;
        }) => void;
        ConfigResponseMode: { Callback: string };
        ConfigSource: { LOWCODE: string };
      };
      Auth: {
        login: () => Promise<{ code: string; device_id: string }>;
        exchangeCode: (code: string, deviceId: string) => Promise<{
          access_token: string;
          user_id: number;
        }>;
        userInfo: (accessToken: string) => Promise<{
          user: {
            first_name: string;
            last_name: string;
            avatar: string;
          };
        }>;
      };
      OneTap: new () => {
        render: (params: { container: HTMLElement; showAlternativeLogin: boolean }) => {
          on: (event: string, handler: (...args: unknown[]) => void) => void;
        };
      };
      FloatingOneTap: new () => {
        render: (params: {
          scheme?: string;
          appName?: string;
          showAlternativeLogin?: boolean;
        }) => {
          on: (event: string, handler: (payload: unknown) => void) => void;
          close: () => void;
        };
      };
      FloatingOneTapInternalEvents: { LOGIN_SUCCESS: string };
      WidgetEvents: { ERROR: string };
      OneTapInternalEvents: { LOGIN_SUCCESS: string };
    };
    Telegram?: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          query_id?: string;
          user?: Record<string, unknown>;
          receiver?: Record<string, unknown>;
          chat?: {
            id: number;
            type: string;
            title: string;
          };
          can_send_after?: number;
          auth_date: number;
          hash: string;
        };
        ready: () => void;
        close: () => void;
        expand: () => void;
        themeParams: Record<string, string>;
      };
    };
  }
}
