export {};

declare global {
  interface GlobalMessageTypes {
    AUTH_CALLBACK: { backToPath: string };

    AUTH_CALLBACK_FAILURE: {
      message: string;
    };
  }
}
