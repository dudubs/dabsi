import { touchMap } from "../common/map/touchMap";
import { MetaType, WithMetaType } from "../common/MetaType";
import { Rpc, RpcHandlerFn } from "./Rpc";

export type TContextualRpc = {
  Handler: RpcHandlerFn;

  Connection: any;

  Config: object | undefined;

  Context: object;

  Props: object;
};

export type ContextualRpcProps<
  T extends WithMetaType<{ TContextualRpc }>
> = ContextualRpcType<T>["Props"];

export type ContextualRpcType<
  T extends WithMetaType<{ TContextualRpc }>
> = MetaType<T>["TContextualRpc"];

export type ContextualRpcContext<
  T extends AnyContextualRpc
> = ContextualRpcType<T>["Context"];

export type ContextualRpc<T extends TContextualRpc> = WithMetaType<{
  TContextualRpc: T;
}> &
  Rpc<{
    Config: T["Config"];
    Handler: T["Handler"];
    Connection: T["Connection"];
  }> & {
    getContext(config: T["Config"]): T["Context"];
    props: T["Props"];
  };

export type AnyContextualRpc = ContextualRpc<TContextualRpc>;

export type ContextualRpcOptions<T extends TContextualRpc> = {
  props: Readonly<T["Props"]>;

  createHandler(context: T["Context"], props: T["Props"]): T["Handler"];
  createContext(props: T["Props"], config: T["Config"]): T["Context"];
  createConnection(
    handler: T["Handler"],
    props: Readonly<T["Props"]>
  ): T["Connection"];
};

export function ContextualRpc<Rpc extends AnyContextualRpc>(
  options: ContextualRpcOptions<ContextualRpcType<Rpc>>
): Rpc {
  type T = ContextualRpcType<Rpc>;

  let contextForNullConfig: T["Context"] | undefined = undefined;
  const handlers = new WeakMap<NonNullable<T["Config"]>, T["Context"]>();

  return <any>(<ContextualRpc<T>>{
    props: options.props,
    getContext(config): T["Context"] {
      if (!config)
        return (
          contextForNullConfig ??
          (contextForNullConfig = options.createContext(
            options.props,
            <any>null
          ))
        );
      return touchMap(handlers, config!, (config) =>
        options.createContext(options.props, config)
      );
    },
    createRpcHandler(config) {
      return options.createHandler(this.getContext(config), options.props);
    },
    createRpcConnection: (handler) =>
      options.createConnection(handler, options.props),
  });
}
