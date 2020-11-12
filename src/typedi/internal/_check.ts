import { Context, Resolver } from "../Resolver";

export const checkSymbol = Symbol();

export function _check<T>(resolver: Resolver<T>, context: Context<any>): void {
  resolver[checkSymbol]?.(context);
}
