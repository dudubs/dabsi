import { createElement, ReactNode, useContext } from "react";
import { createUndefinedContext } from "../react/utils/hooks/createUndefinedContext";
import { History } from "history";
import { useDefinedContext } from "../react/utils/hooks/useDefinedContext";

const context = createUndefinedContext<History>();

export const useHistory = (): History => useDefinedContext(context);

export function HistoryProvider({
  history,
  children,
}: {
  history: History;
  children: ReactNode;
}) {
  return createElement(context.Provider, { value: history, children });
}