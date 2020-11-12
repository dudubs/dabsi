import { Context, Resolver } from "../Resolver";

export const resolveSymbol = Symbol();

export function _resolve<T>(resolver: Resolver<T>, context: Context<any>): T {
  return resolver[resolveSymbol](context);
}
