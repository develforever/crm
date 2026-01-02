declare global {
  interface AppConfig {
    intranetUrl?: string;
    [key: string]: unknown;
  }

  interface Window {
    AppConfig?: AppConfig;
  }
}

export {};