import { touchMap } from "../../common/map/touchMap";
import { MetaType, WithMetaType } from "../../common/MetaType";
import { Awaitable } from "../../common/typings";
import { ConfigFactory } from "../ConfigFactory";
import { RpcConfigOld } from "./Old";
import { Rpc, RpcCommand } from "../Rpc";
import { ConfigFactory2 } from "../GenericConfig";

export type TContextualRpc = {
  Connection: any;

  Config: object | undefined;

  Handler: object;

  Props: object;
};

export type ContextualRpcProps<
  T extends WithMetaType<{ TContextualRpc }>
> = ContextualRpcType<T>["Props"];

export type ContextualRpcType<
  T extends WithMetaType<{ TContextualRpc }>
> = MetaType<T>["TContextualRpc"];

export type ContextualRpcContext<T extends AnyContextualRpc> = Promise<
  ContextualRpcType<T>["Handler"]
>;

export type ContextualRpcContextType<
  T extends AnyContextualRpc
> = ContextualRpcType<T>["Handler"];

export type ContextualRpcConfig<T extends AnyContextualRpc> = MetaType<
  T
>["TContextualRpc"]["Config"];

export type ContextualRpc<T extends TContextualRpc> = WithMetaType<{
  TContextualRpc: T;
}> &
  Rpc<{
    Config: T["Config"];
    Handler: T["Handler"];
    Connection: T["Connection"];
  }> & {
    getContext(config: RpcConfigOld<ContextualRpc<T>>): Promise<T["Handler"]>;

    props: T["Props"];
  };

export type AnyContextualRpc = ContextualRpc<TContextualRpc>;

export type ContextualRpcOptions<T extends TContextualRpc> = {
  props: Readonly<T["Props"]>;

  createHandler(context: T["Handler"], props: T["Props"]): T["Handler"];
  createContext(props: T["Props"], config: T["Config"]): T["Handler"];

  createConnection(
    handler: T["Handler"],
    props: Readonly<T["Props"]>
  ): T["Connection"];
};

export function ContextualRpc<Rpc extends AnyContextualRpc>(
  options: ContextualRpcOptions<ContextualRpcType<Rpc>>
): Rpc {
  type T = ContextualRpcType<Rpc>;

  // let contextForNullConfig: T["Handler"] | undefined = undefined;
  const handlers = new WeakMap<any, T["Handler"]>();
  const nullConfig = {};
  return <any>(<ContextualRpc<T>>{
    props: options.props,
    getContext(config = nullConfig): Promise<T["Handler"]> {
      // if (!config)
      //   return (
      //     contextForNullConfig ??
      //     (contextForNullConfig = options.createContext(
      //       options.props,
      //       <any>null
      //     ))
      //   );

      return <any>(
        touchMap(
          handlers,
          config,
          async config =>
            await options.createContext(
              options.props,
              typeof config["$context"] === "function"
                ? await config["$context"](this)
                : config
            )
        )
      );
    },
    // getContext(config): T["Handler"] {
    //   if (!config)
    //     return (
    //       contextForNullConfig ??
    //       (contextForNullConfig = options.createContext(
    //         options.props,
    //         <any>null
    //       ))
    //     );
    //   return touchMap(handlers, config!, config =>
    //     options.createContext(options.props, config)
    //   );
    // },
    createRpcCommand(config) {
      return options.createHandler(this.getContext(config), options.props);
    },
    createRpcConnection: handler =>
      options.createConnection(handler, options.props),
  });
}
