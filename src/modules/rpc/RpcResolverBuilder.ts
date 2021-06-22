import { hasKeys } from "@dabsi/common/object/hasKeys";
import { IfNever } from "@dabsi/common/typings2/IfNever";
import { inspect } from "@dabsi/logging/inspect";
import {
  RpcLocationConfigurator,
  RpcResolver,
} from "@dabsi/modules/rpc/RpcResolver";
import { Resolved, ResolvedMap, Resolver, ResolverMap } from "@dabsi/typedi";
import { RpcAt, RpcLocation, RpcValidatePath } from "@dabsi/typerpc2";
import { RpcTypeOrLocation } from "@dabsi/typerpc2/RpcTypeOrLocation";

type RpcResolverConfig<
  TargetIn,
  TargetNew,
  Path extends string, // Path
  ContextIn, // Context
  ContextNew extends ResolverMap, // NewContext
  //
  ContextOut = ContextIn & ResolvedMap<ContextNew>, // ResolvedContext
  TargetNewOrIn = IfNever<TargetNew, TargetIn>,
  TargetOut = RpcAt<TargetNewOrIn, Path>, // ResolvedTarget
  InvalidPath = RpcValidatePath<TargetNewOrIn, Path, never> // InvalidPath
> = {
  for?: RpcTypeOrLocation<TargetNew>;

  at?: Path | Path[];

  with?: ContextNew;

  let?: IfNever<
    InvalidPath,
    (builder: RpcResolverConfigBuilder<TargetOut, ContextOut>) => any
  >;

  resolve?: IfNever<
    InvalidPath,
    (location: RpcLocation<TargetOut>) => RpcResolver<TargetOut>
  >;

  configure?: IfNever<
    InvalidPath,
    (context: ContextOut) => RpcLocationConfigurator<TargetOut>
  >;

  provide?: IfNever<InvalidPath, ResolverMap>;

  debug?(_: {
    TargetIn: TargetIn;
    ContextIn: ContextIn;
    ContextNew: ContextNew;
    ContextOut: ContextOut;
    ResolvedTarget: TargetOut;
    NewTarget: TargetNew;
    Path: Path;
    TargetNewOrIn: TargetNewOrIn;
  });
};

type RpcResolverConfigBuilder<TargetIn, ContextIn> = {
  <
    ContextNew extends ResolverMap,
    Path extends string = never,
    TargetOut = never
  >(
    config: RpcResolverConfig<TargetIn, TargetOut, Path, ContextIn, ContextNew>
  );
};
export type AnyRpcResolverConfig = RpcResolverConfig<any, any, any, any, any>;

export const RpcResolverBuilder: RpcResolverConfigBuilder<never, {}> = (
  config: RpcResolverConfig<any, any, any, any, any>
) => {
  const resolvers: any[] = [];

  configure(config, {}, {});

  if (!resolvers.length) {
    console.log({ config });
  }
  return resolvers;

  function configure(
    config: AnyRpcResolverConfig,
    consumedContext: ResolverMap,
    providedContext: ResolverMap
  ) {
    const location = config.for && RpcTypeOrLocation(config.for);

    if (config.with) {
      consumedContext = { ...consumedContext, ...config.with };
      config = { ...config, with: undefined };
    }

    const assertLocation = reason => {
      if (!location) {
        throw new Error(
          `no rpc-location for config.${reason}, ${inspect(config)}.`
        );
      }
    };

    if (config.at) {
      assertLocation("at");
      (typeof config.at === "string" ? [config.at] : config.at).forEach(
        path => {
          configure(
            { ...config, for: location!.at(path), at: undefined },
            consumedContext,
            providedContext
          );
        }
      );
      return;
    }

    config.let?.(config =>
      configure(
        { for: location, ...config } as any,
        consumedContext,
        providedContext
      )
    );

    const pushResolver = resolver => {
      if (hasKeys(providedContext)) {
        resolver = RpcResolver.bindToLocation(
          location!,
          Resolver.withContext(resolver, providedContext)
        );
      }
      resolvers.push(resolver);
    };

    if (config.resolve) {
      assertLocation("resolve");

      pushResolver(config.resolve(location!));
    }

    if (config.configure) {
      assertLocation("configure");
      pushResolver(RpcResolver(location!, consumedContext, config.configure));
    }
  }
};

export default RpcResolverBuilder;
