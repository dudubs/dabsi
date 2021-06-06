import { pick } from "@dabsi/common/object/pick";
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

  get context(): { [K in keyof C]: Resolver<C[K]> } {
    return { ...(<any>this._context) };
  }

  with<U extends ResolverMap>(
    context: U,
    callback: (
      location: RpcResolverLocation<
        T,
        C &
          {
            [K in keyof U]: Resolved<U[K]>;
          }
      >
    ) => any
  ): this;

  with<U extends ResolverMap>(
    context: U
  ): RpcResolverLocation<
    T,
    C &
      {
        [K in keyof U]: Resolved<U[K]>;
      }
  >;

  with<K extends keyof C>(
    keys: K[],
    callback: (location: RpcResolverLocation<T, Pick<C, K>>) => any
  ): this;

  with<K extends keyof C>(keys: K[]): RpcResolverLocation<T, Pick<C, K>>;

  with(keysOrContext, callback?): any {
    if (Array.isArray(keysOrContext)) {
      const keys = keysOrContext;
      if (callback) {
        callback(
          new RpcResolverLocation(
            this._location,
            pick(this._context, keys),
            this._resolvers
          )
        );
        return this;
      }
    }

    const context = keysOrContext;
    if (callback) {
      callback(
        new RpcResolverLocation(
          this._location,
          {
            ...this._context,
            ...context,
          },
          this._resolvers
        )
      );
      return this;
    }
    Object.assign(this._context, context);
    return <any>this;
  }

  at<K extends string>(
    path: K | K[],
    callback: RpcValidatePath<
      T,
      K,
      (location: RpcResolverLocation<RpcAt<T, K>, C>, path: K) => any
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
        ),
        path
      );
    }

    return this;
  }

  // by-context ([function])
  configure(
    getByContext: (context: C) => RpcLocationConfigurator<T>
  ): RpcResolverLocation<T, C> {
    this._resolvers.push(
      RpcResolver(this._location, this._context, getByContext)
    );
    return this;
  }

  resolve(
    getByLocation: (
      location: RpcLocation<T>
    ) => Resolver<RpcLocationConfigurator<T>>
  ): this {
    this._resolvers.push(
      RpcResolver.bindToLocation(this._location, getByLocation(this._location))
    );
    return this;
  }
}
