import { CustomResolver, Resolver, ResolverType } from "./Resolver";

type Arg<U extends (Resolver | undefined)[], N extends number> = ResolverType<
  NonNullable<U[N]>
>;

export function Consumer<
  T,
  U extends [
    Resolver?,
    Resolver?,
    Resolver?,
    Resolver?,
    Resolver?,
    Resolver?,
    Resolver?,
    Resolver?,
    Resolver?,
    Resolver?
  ]
>(
  deps: U,
  create: (
    ...args: [
      Arg<U, 0>,
      Arg<U, 1>,
      Arg<U, 2>,
      Arg<U, 3>,
      Arg<U, 4>,
      Arg<U, 5>,
      Arg<U, 6>,
      Arg<U, 7>,
      Arg<U, 8>,
      Arg<U, 9>
    ]
  ) => T
): CustomResolver<T> {
  return (context =>
    create.apply(
      context,
      deps.map(resolver => Resolver.resolve(resolver!, context))
    )).toCheck(context => {
    for (const resolver of deps) {
      Resolver.check(resolver!, context);
    }
  });
}
