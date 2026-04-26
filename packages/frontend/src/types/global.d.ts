export {};

declare global {
  interface Window {
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
