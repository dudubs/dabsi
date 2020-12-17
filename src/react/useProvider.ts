import { touchMap } from "@dabsi/common/map/touchMap";
import { ReactElement, useMemo } from "react";

let currentProvider: ((children: ReactElement) => ReactElement) | null = null;

let currentProviderContext: Map<any, any> | null = null;

export function useProviderContext<T>(symbol, init: () => T): T {
  return touchMap(currentProviderContext!, symbol, init);
}

export function useProvider(
  provider: (children: ReactElement) => ReactElement
): void;

export function useProvider(): (children: ReactElement) => ReactElement;

export function useProvider(provider?): any {
  if (provider) {
    if (!currentProvider) {
      throw new Error(`No provider`);
    }
    const prevProvider = currentProvider;
    currentProvider = children => prevProvider(provider(children));
  } else {
    if (currentProvider) {
      throw new Error(`Can't create new provider`);
    }

    currentProvider = children => children;
    currentProviderContext = new Map();

    return children => {
      if (!currentProvider) throw new Error(`No provider.`);
      const provider = currentProvider;
      currentProvider = null;
      currentProviderContext = null;
      return provider(children);
    };
  }
}
