import { entries } from "../../common/object/entries";
import { mergeDescriptors } from "../../common/object/mergeDescriptors";
import { capitalize } from "../../common/string/capitalize";
import {
  Fn,
  If,
  Is,
  IsEmptyObject,
  Not,
  Override,
  PartialUndefinedKeys,
  Union,
} from "../../common/typings";
import { NoRpc } from "../NoRpc";
import {
  AnyRpc,
  BasedRpc,
  IRpcHandler,
  Rpc,
  RpcConnection,
  RpcCommand,
  RpcHandlerClass,
  RpcType,
  RpcUnresolvedConfig,
  TRpc,
} from "../Rpc";
import { IsGenericConfig } from "../GenericConfig";

type _WidgetConnection<T extends TWidget> = T["Connection"] & {
  rpc: Widget<T>;
  rpcCommand: RpcCommand;
  controller: RpcConnection<T["Controller"]>;

  getElement(): Promise<T["Element"]>;

  command<K extends keyof T["Commands"]>(
    key: string & K,
    ...args: Parameters<T["Commands"][K]>
  ): Promise<ReturnType<T["Commands"][K]>>;
};

export type TWidget = {
  Connection: object;
  Config: TRpc["Config"];
  Handler: TRpc["Handler"];
  Props: TRpc["Props"];
  Element: object;
  Controller: AnyRpc;
  Commands: Record<string, Fn & { handler: string }>;
};

export type Widget<
  T extends TWidget,
  C extends TWidget["Commands"] = T["Commands"]
> = Rpc<{
  TWidget: T;

  Payload: [string, any];

  Result;

  Config: T["Config"];

  Handler: T["Handler"] & {
    getElement(): Promise<T["Element"]>;
    getControllerConfig(): RpcUnresolvedConfig<T["Controller"]>;
  };

  Props: T["Props"] & {
    widget: {
      options: WidgetOptions<TWidget>;
      commands: Record<keyof T["Commands"], string>;
      connection: _WidgetConnection<T>;
      controller: T["Controller"];
    };
  };

  Connection: _WidgetConnection<T>;
}>;

export type WidgetOptions<
  T extends TWidget,
  C extends TWidget["Commands"] = T["Commands"]
> = PartialUndefinedKeys<
  {
    isGenericConfig: boolean | If<Not<IsGenericConfig<T["Config"]>>, undefined>;

    props: T["Props"] | If<IsEmptyObject<T["Props"]>, undefined>;

    controller: T["Controller"] | If<Is<T["Controller"], NoRpc>, undefined>;

    commands:
      | { [K in keyof T["Commands"]]: C[K]["handler"] }
      | If<IsEmptyObject<T["Commands"]>, undefined>;

    connection:
      | {
          [K in keyof T["Connection"]]: (
            this: _WidgetConnection<T>
          ) => T["Connection"][K];
        }
      | If<IsEmptyObject<T["Connection"]>, undefined>;
  },
  {
    handler: WidgetHandlerClass<Widget<T>>;
  }
>;

export type WidgetHandlerClass<
  R extends AnyWidget,
  C extends TWidget["Commands"] = WidgetType<R>["Commands"]
> = RpcHandlerClass<R, _WidgetCommandHandlerMap<R>>;

type _WidgetCommandHandlerMap<
  R extends BasedWidget,
  C extends TWidget["Commands"] = WidgetType<R>["Commands"]
> = {
  [HK in Union<{ [K in keyof C]: C[K]["handler"] }>]: Union<
    {
      [K in keyof C]: C[K]["handler"] extends HK
        ? (...args: Parameters<C[K]>) => Promise<ReturnType<C[K]>>
        : never;
    }
  >;
};

export type IWidgetHandler<
  R extends AnyWidget,
  C extends TWidget["Commands"] = WidgetType<R>["Commands"]
> = IRpcHandler<R> & _WidgetCommandHandlerMap<R>;

export const AnyWidgetConnection: _WidgetConnection<TWidget> = {
  get rpc(): any {
    throw new Error();
  },
  get rpcCommand(): any {
    throw new Error();
  },
  get controller(): any {
    throw new Error();
  },
  command(key, ...args) {
    return this.rpcCommand([key, args]);
  },
  getElement() {
    return this.rpcCommand(["getElement", []]);
  },
};

export type AnyWidget = Widget<TWidget>;

export function Widget<R extends AnyWidget, T extends TWidget = WidgetType<R>>(
  options: WidgetOptions<T>
): Widget<T> {
  const {
    isGenericConfig = false,
    props = {},
    handler,
    commands,
    controller,
    connection: connectionDescriptors,
  } = options as WidgetOptions<TWidget>;

  let connection = Object.create(AnyWidgetConnection);

  for (const [key, value] of entries(connectionDescriptors)) {
    const currentKey = "current" + capitalize(key);
    Object.defineProperty(connection, key, {
      get() {
        if (!(currentKey in this)) {
          this[currentKey] = value.apply(this);
        }
        return this[currentKey];
      },
    });
  }

  return <any>Rpc<AnyWidget>({
    handler,
    isGenericConfig,
    props: mergeDescriptors(props as {}, {
      widget: {
        controller: controller || NoRpc,
        options: <WidgetOptions<TWidget>>options,
        commands: commands || {},
        connection: connection,
      },
    }),
    connect(command) {
      return Object.setPrototypeOf(
        {
          rpc: this,
          rpcCommand: command,
          controller: this.widget.controller.createRpcConnection(payload => {
            return command(["controller", payload]);
          }),
        },
        this.widget.connection
      );
    },
  });
}

/////////////

export type AnyWidgetConnection = RpcConnection<AnyWidget>;

export type BasedWidget<T extends TWidget = TWidget> = BasedRpc<
  RpcType<Widget<T>>
>;

export type WidgetType<T extends BasedWidget> = RpcType<T>["TWidget"];

export type WidgetElement<T extends BasedWidget> = WidgetType<T>["Element"];

export type WidgetController<T extends BasedWidget> = WidgetType<
  T
>["Controller"];

export type WidgetHook<
  R extends AnyWidget,
  T extends Partial<TWidget>
> = Widget<Extract<Override<WidgetType<R>, T>, TWidget>>;

export type IWidget = Widget<
  Override<
    TWidget,
    {
      Commands: {};
    }
  >
>;
