import { createUndefinedContext } from "@dabsi/view/react/utils/hooks/createUndefinedContext";
import { useDefinedContext } from "@dabsi/view/react/utils/hooks/useDefinedContext";
import { History } from "history";
import { createElement, ReactNode } from "react";

const context = createUndefinedContext<History>();

export const useHistory = (): History<any> => useDefinedContext(context);

export function HistoryProvider({
  history,
  children,
}: {
  history: History;
  children: ReactNode;
}) {
  return createElement(context.Provider, { value: history, children });
}
