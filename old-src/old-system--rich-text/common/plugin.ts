declare global {
  namespace IRichText {
    interface ConfigAndElement {
      allowAll?: boolean;
    }
  }
}

export namespace RichTextPlugin {
  export function getConfig<T, K extends keyof T>(
    config: T,
    key: K
  ): Partial<Extract<T[K], object>> | null {
    const value = config[key];
    if (value && typeof value === "object") {
      return value;
    }

    if (config["allowAll"] || value) return {};

    return null;
  }

  export function assertConfig<T, K extends keyof T>(
    config: T,
    key: K
  ): Partial<Extract<T[K], object>> {
    const pluginConfig = getConfig(config, key);
    if (!pluginConfig) {
      throw new Error(`The rich-text plugin "${key}" is not allowed.`);
    }
    return pluginConfig;
  }
}
