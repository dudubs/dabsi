import { inspect } from "@dabsi/logging/inspect";
import {
  RpcLocationConfigurator,
  RpcResolver,
} from "@dabsi/modules/rpc/RpcResolver";
import { Resolved, Resolver, ResolverMap } from "@dabsi/typedi";
import { ConsumeArgs, ResolverDeps } from "@dabsi/typedi/consume";
import { RpcAt, RpcLocation, RpcValidatePath } from "@dabsi/typerpc2";

export default class RpcResolverLocation<T, C> {
  constructor(
    protected _location: RpcLocation<any>,
    protected _context: ResolverMap,
    protected _resolvers: RpcResolver<any>[]
  ) {}

  with<U extends ResolverMap>(
    context: U
  ): RpcResolverLocation<
    T,
    C &
      {
        [K in keyof U]: Resolved<U[K]>;
      }
  > {
    Object.assign(this._context, context);
    return <any>this;
  }

  at<K extends string>(
    path: K | K[],
    callback: RpcValidatePath<
      T,
      K,
      (location: RpcResolverLocation<RpcAt<T, K>, C>) => any
    >
  ): RpcResolverLocation<T, C>;
  at(paths, callback) {
    if (typeof paths === "string") {
      paths = [paths];
    }

    for (const path of paths) {
      callback(
        new RpcResolverLocation(
          this._location.at(path),
          { ...this._context },
          this._resolvers
        )
      );
    }

    return this;
  }

  configure(
    createResolver: [
      factory: (context: C) => Resolver<RpcLocationConfigurator<T>>
    ]
  ): RpcResolverLocation<T, C>;

  configure<K extends string>(
    pathOrPaths: K | K[],
    getMemberConfiguratorResolver: RpcValidatePath<
      T,
      K,
      (
        location: RpcLocation<RpcAt<T, K>>
      ) => Resolver<RpcLocationConfigurator<RpcAt<T, K>>>
    >
  ): RpcResolverLocation<T, C>;

  configure<K extends string>(
    pathOrPaths: K | K[],
    createResolver: RpcValidatePath<
      T,
      K,
      [factroy: (context: C) => RpcLocationConfigurator<RpcAt<T, K>>]
    >
  ): RpcResolverLocation<T, C>;
  configure<K extends string, U extends ResolverDeps>(
    pathOrPaths: K | K[],
    ...args: ConsumeArgs<
      RpcValidatePath<T, K, RpcLocationConfigurator<RpcAt<T, K>>>,
      U
    >
  ): RpcResolverLocation<T, C>;

  configure(
    getResolver: (
      location: RpcLocation<T>
    ) => Resolver<RpcLocationConfigurator<T>>
  ): RpcResolverLocation<T, C>;

  configure(...args) {
    let [arg0, arg1] = args;

    const paths = typeof arg0 === "string" ? [arg0] : arg0;

    if (args.length === 1) {
      // ... (rpcTypeOrLocation, rpcResolverLocationCallback)
      if (
        Array.isArray(arg0) &&
        arg0.length === 1 &&
        typeof arg0[0] === "function"
      ) {
        this._resolvers.push(
          RpcResolver(this._location, this._context, arg0[0])
        );
      }

      // .. (getResolverByLocation)
      const [factory] = arg1 as [(context) => RpcLocationConfigurator<any>];
      this._resolvers.push(RpcResolver(this._location, this._context, factory));
      return this;
    }

    if (args.length === 2) {
      // ... (pathOrPaths, [context => configurator])
      if (
        arg1.length === 1 &&
        Array.isArray(arg1) &&
        typeof arg1[0] === "function"
      ) {
        const [factory] = arg1 as [(context) => RpcLocationConfigurator<any>];

        for (const path of paths) {
          this._resolvers.push(
            RpcResolver(this._location.at(path), this._context, factory)
          );
        }
        return this;
      }

      // ... (pathOrPaths, getResolverByLocation)
      const getResolverByLocation = arg1 as (
        location: RpcLocation<any>
      ) => Resolver<RpcLocationConfigurator<any>>;

      for (const path of paths) {
        const location = this._location.at(path);

        this._resolvers.push(
          RpcResolver.create(location, getResolverByLocation(location))
        );
      }
      return this;
    }

    // ... (rpcTypeOrLocation, ...consumeArgs)
    if (args.length === 3) {
      const [_, ...consumeArgs] = args;
      const resolver: any = ConsumeArgs(consumeArgs as [{}, any])!;

      for (const path of paths) {
        this._resolvers.push(
          RpcResolver.create(this._location.at(path), resolver)
        );
      }
      return this;
    }

    throw new Error(`Invalid arguments ${inspect(args)}.`);
  }
}
