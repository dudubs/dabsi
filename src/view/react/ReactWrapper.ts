import { reversed } from "@dabsi/common/array/reversed";
import React, { ReactElement } from "react";

export type ReactWrapper = (children: ReactElement) => ReactElement;

let currentWrappers: ReactWrapper[] | null = null;

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
  currentWrappers = null;
  currentContext = null;
}

function begin() {
  if (currentWrappers) {
    throw new Error(`Can't create new wapper`);
  }
  currentWrappers = [];
  currentContext = new Map();
}

function end(element: React.ReactElement) {
  if (!currentWrappers) {
    throw new Error(`No wrapper.`);
  }
  const wrappers = currentWrappers;
  clean();

  for (const wrapper of reversed(wrappers)) {
    element = wrapper(element);
  }

  return element;
}

export namespace ReactWrapper {
  export function createContext<T>(init: () => T): () => T {
    const symbol = Symbol("symbol");
    return () => {
      return currentContext!.touch(symbol, () => init());
    };
  }

  export function push(...wrappers: ReactWrapper[]): void {
    if (!currentWrappers) {
      throw new Error(`No provider`);
    }
    currentWrappers.push(...wrappers);
  }
}
