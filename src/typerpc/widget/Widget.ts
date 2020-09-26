import { MetaType, MetaTypeHook, WithMetaType } from "../../common/MetaType";
import { mergeDescriptors } from "../../common/object/mergeDescriptors";
import { setProto } from "../../common/object/setProto";
import {
  Fn,
  HasKeys,
  If,
  Is,
  Not,
  PartialUndefinedKeys,
} from "../../common/typings";
import {
  ContextualRpc,
  ContextualRpcProps,
  ContextualRpcType,
} from "../ContextualRpc";
import { NoRpc } from "../NoRpc";
import {
  AnyRpc,
  RpcConfig,
  RpcConnection,
  RpcPayload,
  RpcResult,
} from "../Rpc";
import {
  IsRpcGenericConfigFn,
  RpcGenericConfig,
  RpcGenericConfigFn,
} from "../RpcGenericConfig";
import {
  RpcMapHandler,
  RpcMapHandlerFn,
  RpcMapHandlerMap,
  TRpcMapHandlerMap,
} from "../RpcMapHandler";

export type WidgetHandlerMap<T extends TWidget> = T["Handler"] & {
  getElement: RpcMapHandlerFn.NoPayload<T["Element"]>;

  controller: RpcMapHandlerFn<
    RpcPayload<T["Controller"]>,
    RpcResult<T["Controller"]>
  >;
};

export type BaseWidgetContext<
  T extends Pick<TWidget, "Controller" | "Element">
> = {
  getControllerConfig(): RpcConfig<T["Controller"]>;

  getElement(): Promise<T["Element"]>;
};

export type WidgetHandler<T extends TWidget> = RpcMapHandler<
  WidgetHandlerMap<T>
>;

export type WidgetConnection<T extends TWidget> = WithMetaType<{
  TWidget: T;
}> & {
  handler: WidgetHandler<T>;

  props: Readonly<WidgetProps<T>>;
  controller: RpcConnection<T["Controller"]>;
  getElement(): Promise<T["Element"]>;
};

export type WidgetContext<T extends TWidget> = BaseWidgetContext<T> &
  T["Context"] & {
    props: WidgetProps<T>;
    config: WidgetConfig<T>;
  };

export type WidgetContextClass2<T extends TWidget> = new (
  props: WidgetProps<T>,
  config: WidgetConfig<T>
) => WidgetContext<T>;

export type WidgetContextClass<T extends AnyWidget> = new (
  props: ContextualRpcProps<T>,
  config: WidgetConfig<WidgetType<T>>
) => WidgetContext<WidgetType<T>>;

export type WidgetConfig<
  T extends Pick<TWidget, "Config">,
  C = T["Config"]
> = C extends Fn ? If<IsRpcGenericConfigFn<C>, ReturnType<C>, C> : C;

export type WidgetHook<
  R extends AnyWidget,
  T extends Partial<TWidget>,
  MT = {}
> = MetaTypeHook<R, AnyWidget, MT> &
  Widget<Extract<Omit<WidgetType<R>, keyof T> & T, TWidget>>;

export type TWidget = {
  Connection: object;
  Config: object | undefined;
  Context: object;
  Props: object;
  Handler: TRpcMapHandlerMap;
  Element: object;
  Controller: AnyRpc;
};

export type WidgetProps<T extends TWidget> = T["Props"] & {
  controller: T["Controller"];

  context: WidgetContextClass<Widget<T>>;

  isGenericConfig: boolean;
};
export declare const WidgetController: unique symbol;

export type Widget<T extends TWidget, U = {}> = WithMetaType<{ TWidget: T }> &
  ContextualRpc<{
    Config: T["Config"];

    Context: WidgetContext<T>;

    Props: WidgetProps<T>;

    Handler: WidgetHandler<T>;

    Connection: WidgetConnection<T> & T["Connection"];
  }>;

export type WidgetOptions<
  Widget extends AnyWidget,
  T extends TWidget
> = PartialUndefinedKeys<{
  connection:
    | (ThisType<WidgetConnection<T>> & T["Connection"])
    | If<Not<HasKeys<T["Connection"]>>, undefined>;

  context: WidgetContextClass<Widget>;

  isGenericConfig:
    | boolean
    | If<Not<Is<T["Config"], RpcGenericConfigFn>>, undefined>;

  props: T["Props"] | If<Not<HasKeys<T["Props"]>>, undefined>;

  controller: T["Controller"] | If<Is<T["Controller"], NoRpc>, undefined>;

  handler:
    | RpcMapHandlerMap<WidgetHandlerContext<T>, T["Handler"]>
    | If<Not<HasKeys<T["Handler"]>>, undefined>;
}>;

export type WidgetHandlerContext<T extends TWidget> = T["Context"] & {
  props: WidgetProps<T>;
  config: WidgetConfig<T>;
};

export function Widget<T extends AnyWidget>(
  options: WidgetOptions<T, WidgetType<T>>
) {
  const {
    props = {},
    handler = {},
    connection = {},
    controller = NoRpc,
    context,
    isGenericConfig = false,
  } = <WidgetOptions<AnyWidget, TWidget>>options;

  type H = WidgetHandlerMap<TWidget>;

  type C = ContextualRpcType<T>["Context"] & {
    config: RpcConfig<T>;
  };

  return <T>ContextualRpc<AnyWidget>({
    props: mergeDescriptors(props, {
      isGenericConfig,
      controller,
      context,
    }),
    createHandler: RpcMapHandler<C, H>({
      ...handler,
      controller: (context, payload) => {
        const controllerConfig = context.getControllerConfig();
        return controller.createRpcHandler(controllerConfig)(payload);
      },
      getElement: (context) => {
        return context.getElement();
      },
    }),
    createConnection: (handler, props) => {
      return Object.setPrototypeOf(
        {
          handler,
          props,
          getElement: () => handler("getElement"),
          controller: controller.createRpcConnection((payload) =>
            handler(["controller", payload])
          ),
        },
        connection
      );
    },
    createContext: (props, config: any) => {
      if (isGenericConfig) {
        config = RpcGenericConfig(config);
      }
      return new context(props, config);
    },
  });
}

/////////////

export type AnyWidget = Widget<TWidget>;
export type AnyWidgetConnection = RpcConnection<AnyWidget>;

export type WithWidgetType<T extends AnyWidget = AnyWidget> = WithMetaType<{
  TWidget: WidgetType<T>;
}>;

export type WidgetType<T extends WithWidgetType> = MetaType<T>["TWidget"];

export type WidgetElement<T extends WithWidgetType> = WidgetType<T>["Element"];

export type WidgetController<T extends WithWidgetType> = WidgetType<
  T
>["Controller"];
