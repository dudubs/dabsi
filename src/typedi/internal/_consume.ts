import { _check } from "./_check";
import { _resolve } from "./_resolve";
import { _arrayResolver } from "./_arrayResolver";
import { _objectResolver } from "./_objectResolver";
import { CustomResolver, Resolver, ResolverType } from "../Resolver";

type A<U extends (Resolver | undefined)[], N extends number> = ResolverType<
  NonNullable<U[N]>
>;

type R = Resolver;

// prettier-ignore
export function _consume<
  T,
  U extends [
      R?, R?, R?, R?, R?, R?, R?, R?, R?, R?,
      R?, R?, R?, R?, R?, R?, R?, R?, R?, R?,
      R?, R?, R?, R?, R?, R?, R?, R?, R?, R?,
      R?, R?, R?, R?, R?, R?, R?, R?, R?, R?,
      R?, R?, R?, R?, R?, R?, R?, R?, R?, R?,
  ]
>(
  deps: U,
  create: (
    ...args: [
        A<U, 0>,  A<U, 1>,  A<U, 2>,  A<U, 3>,  A<U, 4>,  A<U, 5>,  A<U, 6>,  A<U, 7>,  A<U, 8>,  A<U, 9>,
        A<U, 10>, A<U, 11>, A<U, 12>, A<U, 13>, A<U, 14>, A<U, 15>, A<U, 16>, A<U, 17>, A<U, 18>, A<U, 19>,
        A<U, 20>, A<U, 21>, A<U, 22>, A<U, 23>, A<U, 24>, A<U, 25>, A<U, 26>, A<U, 27>, A<U, 28>, A<U, 29>,
        A<U, 30>, A<U, 31>, A<U, 32>, A<U, 33>, A<U, 34>, A<U, 35>, A<U, 36>, A<U, 37>, A<U, 38>, A<U, 39>,
        A<U, 40>, A<U, 41>, A<U, 42>, A<U, 43>, A<U, 44>, A<U, 45>, A<U, 46>, A<U, 47>, A<U, 48>, A<U, 49>,
    ]
  ) => T
): CustomResolver<T>

export function _consume<T, U extends Record<string, Resolver>>(
  deps: U,
  create: (context: { [K in keyof U]: ResolverType<U[K]> }) => T
): CustomResolver<T>;
export function _consume(deps, create): any {
  if (Array.isArray(deps)) {
    const depsResolver = _arrayResolver(deps);
    return (context => create(..._resolve(depsResolver, context))).toCheck(
      context => {
        _check(depsResolver, context);
      }
    );
  }
  const depsResolver = _objectResolver(deps);
  return (context => {
    return create(_resolve(depsResolver, context));
  }).toCheck(context => {
    _check(depsResolver, context);
  });
}
