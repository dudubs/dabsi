import {
  CustomResolver,
  Resolved,
  ResolvedMap,
  Resolver,
  ResolverMap,
} from "@dabsi/typedi/Resolver";

type A<U extends (Resolver | undefined)[], N extends number> = Resolved<
  NonNullable<U[N]>
>;

type R = Resolver;

// prettier-ignore
export type ResolverArray = [
  R?, R?, R?, R?, R?, R?, R?, R?, R?, R?,
  R?, R?, R?, R?, R?, R?, R?, R?, R?, R?,
  R?, R?, R?, R?, R?, R?, R?, R?, R?, R?,
  R?, R?, R?, R?, R?, R?, R?, R?, R?, R?,
  R?, R?, R?, R?, R?, R?, R?, R?, R?, R?,
]

// prettier-ignore
export type ResolvedArray<U extends ResolverArray> = [
  A<U, 0>,  A<U, 1>,  A<U, 2>,  A<U, 3>,  A<U, 4>,  A<U, 5>,  A<U, 6>,  A<U, 7>,  A<U, 8>,  A<U, 9>,
  A<U, 10>, A<U, 11>, A<U, 12>, A<U, 13>, A<U, 14>, A<U, 15>, A<U, 16>, A<U, 17>, A<U, 18>, A<U, 19>,
  A<U, 20>, A<U, 21>, A<U, 22>, A<U, 23>, A<U, 24>, A<U, 25>, A<U, 26>, A<U, 27>, A<U, 28>, A<U, 29>,
  A<U, 30>, A<U, 31>, A<U, 32>, A<U, 33>, A<U, 34>, A<U, 35>, A<U, 36>, A<U, 37>, A<U, 38>, A<U, 39>,
  A<U, 40>, A<U, 41>, A<U, 42>, A<U, 43>, A<U, 44>, A<U, 45>, A<U, 46>, A<U, 47>, A<U, 48>, A<U, 49>,
];

export type ConsumerDeps = ResolverArray | ResolverMap<any>;

export type ConsumedDeps<U extends ConsumerDeps> = U extends ResolverArray
  ? ResolvedArray<U>
  : ResolvedMap<Extract<U, ResolverMap<any>>>;

export type ConsumerFactory<T, U extends ConsumerDeps> = U extends ResolverArray
  ? (...args: ResolvedArray<U>) => T
  : (context: ResolvedMap<Extract<U, ResolverMap<any>>>) => T;

export interface Consumer {
  <T, U extends ConsumerDeps>(
    deps: U,
    factory: ConsumerFactory<T, U>
  ): CustomResolver<T>;
}

export const Consumer: Consumer = (deps: any, factory: any): any => {
  if (Array.isArray(deps)) {
    const depsResolver = Resolver.array(deps);
    return (context =>
      factory(...Resolver.resolve(depsResolver, context))).toCheck(context => {
      Resolver.check(depsResolver, context);
    });
  }
  const depsResolver = Resolver.object(deps);
  return (context => {
    return factory(Resolver.resolve(depsResolver, context));
  }).toCheck(context => {
    Resolver.check(depsResolver, context);
  });
};

declare module "./Resolver" {
  function Resolver();
}
