import React, { ReactElement } from "react";

let currentWrapper: ((children: ReactElement) => ReactElement) | null = null;

let currentContext: Map<any, any> | null = null;

export function ReactWrapper(callback: () => React.ReactElement) {
  begin();
  let element;
  try {
    element = callback();
  } catch (error) {
    clean();
    throw error;
  }
  return end(element);
}

function clean() {
  currentWrapper = null;
  currentContext = null;
}

function begin() {
  if (currentWrapper) {
    throw new Error(`Can't create new wapper`);
  }
  currentWrapper = children => children;
  currentContext = new Map();
}

function end(children: React.ReactElement) {
  if (!currentWrapper) {
    throw new Error(`No wrapper.`);
  }
  const wrapper = currentWrapper;
  clean();
  return wrapper(children);
}

export namespace ReactWrapper {
  export function createContext<T>(init: () => T): () => T {
    const symbol = Symbol();
    return () => {
      return currentContext!.touch(symbol, () => init());
    };
  }

  export function push(
    wrapper: (children: ReactElement) => ReactElement
  ): void {
    if (!currentWrapper) {
      throw new Error(`No provider`);
    }
    const prevWrapper = currentWrapper;
    currentWrapper = children => prevWrapper(wrapper(children));
  }
}
