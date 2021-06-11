import {
  RpcLocationConfigurator,
  RpcResolver,
} from "@dabsi/modules/rpc/RpcResolver";
import { Resolved, Resolver, ResolverMap } from "@dabsi/typedi";
import {
  Rpc,
  RpcAt,
  RpcLocation,
  RpcType,
  RpcValidatePath,
} from "@dabsi/typerpc2";

export default class RpcResolverBuilder<T, C> {
  constructor(
    protected _location: RpcLocation<any>,
    protected _context: ResolverMap,
    protected _resolvers: RpcResolver<any>[]
  ) {}

  get context(): { [K in keyof C]: Resolver<C[K]> } {
    return { ...(<any>this._context) };
  }

  let(callback: (builder: RpcResolverBuilder<T, C>) => any): this {
    callback(
      new RpcResolverBuilder(
        this._location,
        { ...this._context },
        this._resolvers
      )
    );
    return this;
  }

  with<U extends ResolverMap>(
    context: U
  ): RpcResolverBuilder<
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
      (location: RpcResolverBuilder<RpcAt<T, K>, C>, path: K) => any
    >
  ): RpcResolverBuilder<T, C>;
  at(paths, callback) {
    if (typeof paths === "string") {
      paths = [paths];
    }

    for (const path of paths) {
      callback(
        new RpcResolverBuilder(
          this._location.at(path),
          { ...this._context },
          this._resolvers
        ),
        path
      );
    }

    return this;
  }

  configure(
    getByContext: (context: C) => RpcLocationConfigurator<T>
  ): RpcResolverBuilder<T, C> {
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
