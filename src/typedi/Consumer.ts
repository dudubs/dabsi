import { checkResolver } from "@dabsi/typedi/operators/checkResolver";
import { resolve } from "@dabsi/typedi/resolve";
import { ArrayResolver } from "@dabsi/typedi/resolvers/ArrayResolver";
import { ObjectResolver } from "@dabsi/typedi/resolvers/ObjectResolver";
import {
  CustomResolver,
  ResolveMapType,
  Resolver,
  ResolverMap,
  ResolverType,
} from "@dabsi/typedi/Resolver";

type A<U extends (Resolver | undefined)[], N extends number> = ResolverType<
  NonNullable<U[N]>
>;

type R = Resolver;

// prettier-ignore
type ResolverArray = [
  R?, R?, R?, R?, R?, R?, R?, R?, R?, R?,
  R?, R?, R?, R?, R?, R?, R?, R?, R?, R?,
  R?, R?, R?, R?, R?, R?, R?, R?, R?, R?,
  R?, R?, R?, R?, R?, R?, R?, R?, R?, R?,
  R?, R?, R?, R?, R?, R?, R?, R?, R?, R?,
]

export type ConsumeDeps = ResolverArray | ResolverMap<any>;

// prettier-ignore
type ArrayDeps<U extends ResolverArray> = [
  A<U, 0>,  A<U, 1>,  A<U, 2>,  A<U, 3>,  A<U, 4>,  A<U, 5>,  A<U, 6>,  A<U, 7>,  A<U, 8>,  A<U, 9>,
  A<U, 10>, A<U, 11>, A<U, 12>, A<U, 13>, A<U, 14>, A<U, 15>, A<U, 16>, A<U, 17>, A<U, 18>, A<U, 19>,
  A<U, 20>, A<U, 21>, A<U, 22>, A<U, 23>, A<U, 24>, A<U, 25>, A<U, 26>, A<U, 27>, A<U, 28>, A<U, 29>,
  A<U, 30>, A<U, 31>, A<U, 32>, A<U, 33>, A<U, 34>, A<U, 35>, A<U, 36>, A<U, 37>, A<U, 38>, A<U, 39>,
  A<U, 40>, A<U, 41>, A<U, 42>, A<U, 43>, A<U, 44>, A<U, 45>, A<U, 46>, A<U, 47>, A<U, 48>, A<U, 49>,
];

export type ConsumeFactory<T, U extends ConsumeDeps> = U extends ResolverArray
  ? (...args: ArrayDeps<U>) => T
  : (context: ResolveMapType<Extract<U, ResolverMap<any>>>) => T;

export type Consumer<T> = <U extends ConsumeDeps>(
  deps: U,
  callback: ConsumeFactory<T, U>
) => Resolver<T>;

export function Consumer<T, U extends ConsumeDeps>(
  deps: U,
  create: ConsumeFactory<T, U>
): CustomResolver<T>;
export function Consumer(deps, create): any {
  if (Array.isArray(deps)) {
    const depsResolver = ArrayResolver(deps);
    return (context => create(...resolve(depsResolver, context))).toCheck(
      context => {
        checkResolver(depsResolver, context);
      }
    );
  }
  const depsResolver = ObjectResolver(deps);
  return (context => {
    return create(resolve(depsResolver, context));
  }).toCheck(context => {
    checkResolver(depsResolver, context);
  });
}
