import { Context, createContext } from "react";

export function createUndefinedContext<T>(): Context<T | undefined> {
  return createContext<T | undefined>(undefined);
}
