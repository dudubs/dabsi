import { useProvider } from "@dabsi/react/useProvider";
import { createElement, useContext, useMemo } from "react";
import React from "react";

export function useContextHook<T>(
  contextType: React.Context<T>,
  callback: (context: T) => T
) {
  useProvider(children => {
    const context = useContext(contextType);
    return createElement(contextType.Provider, {
      children,
      value: useMemo(() => callback(context), [context]),
    });
  });
}
