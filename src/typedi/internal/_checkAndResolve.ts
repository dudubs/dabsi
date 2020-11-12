import { _check } from "./_check";
import { _resolve } from "./_resolve";
import { Context, Resolver } from "../Resolver";

export function _checkAndResolve<T>(
  resolver: Resolver<T>,
  context: Context<any> = {}
): T {
  _check(resolver, context);
  return _resolve(resolver, context);
}
