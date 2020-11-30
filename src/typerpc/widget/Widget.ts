// TODO: remove controller.
import { assignDescriptors } from "../../common/object/assignDescriptors";
import { entries } from "../../common/object/entries";
import { override } from "../../common/object/override";
import { Lazy } from "../../common/patterns/lazy";
import { If, IsUndefined } from "../../common/typings2/boolean";
import { IsEmptyObject } from "../../common/typings2/boolean/IsEmptyObject";
import { IsNever } from "../../common/typings2/boolean/IsNever";
import { Fn } from "../../common/typings2/Fn";
import { Override } from "../../common/typings2/Override";
import { PartialUndefinedKeys } from "../../common/typings2/PartialUndefinedKeys";
import { PickByValue } from "../../common/typings2/PickByValue";
import {
  _RpcHandlerClass,
  AnyRpc,
  BasedRpc,
  IRpcHandler,
  Rpc,
  RpcChildrenOption,
  RpcCommand,
  RpcConnection,
  RpcIsGenericConfigOption,
  RpcPropsOption,
  RpcType,
  TRpc,
} from "../Rpc";
import { RpcFnMap } from "../rpc-fn/RpcFn";
import { BaseWidgetConnection } from "./BaseWidgetConnection";

export type TWidgetMap = Record<string, TWidget>;

export type TWidget = {
  Connection: object;

  Controller: Record<string, Fn | AnyRpc>;

  Config: TRpc["Config"];
  Children: TRpc["Children"];
  Handler: TRpc["Handler"];
  Props: TRpc["Props"];
  Element: object;
  Commands: Record<string, Fn>;
  ElementState: any;
};

export type WidgetChildren<T extends BasedWidget> = WidgetType<T>["Children"];

export type WidgetChild<
  T extends BasedWidget,
  K extends keyof WidgetChildren<T>
> = WidgetChildren<T>[K];

export type WidgetChildConnection<
  T extends BasedWidget,
  K extends keyof WidgetChildren<T>
> = RpcConnection<WidgetChild<T, K>>;

export type ToAsync<T extends Fn> = (
  ...args: Parameters<T>
) => Promise<ReturnType<T>>;

export type ToAsyncMap<T extends Record<string, Fn>> = {
  [K in keyof T]: ToAsync<T[K]>;
};

export type Widget<
  T extends TWidget,
  C extends TWidget["Commands"] = T["Commands"]
> = Rpc<{
  TWidget: T;

  Widget: T;

  Payload: [string, any[]];

  Children: T["Children"];

  Config: T["Config"];

  Handler: T["Handler"] & {
    getElement(state: T["ElementState"] | undefined): Promise<T["Element"]>;
  };

  Props: T["Props"] & {
    widgetConnectionClass: WidgetConnectionClass<T>;
  };

  Connection: _WidgetConnection<T>;
}>;

export type WidgetOptions<T extends TWidget> = PartialUndefinedKeys<
  {
    isGenericConfig: RpcIsGenericConfigOption<T>;

    props: RpcPropsOption<T>;

    children: RpcChildrenOption<T>;

    connection:
      | {
          [K in keyof T["Connection"]]: (
            connection: _WidgetConnection<T>
          ) => T["Connection"][K];
        }
      | If<IsEmptyObject<T["Connection"]>, undefined>;
  },
  {
    handler: WidgetHandlerClass<Widget<T>>;
  }
>;

export type WidgetConnectionOption<
  T extends TWidget,
  C extends TWidget["Connection"] = T["Connection"]
> =
  | {
      [K in keyof C]: (connection: _WidgetConnection<T>) => C[K];
    }
  | If<IsEmptyObject<C> | IsNever<C>, undefined>;

export type WidgetHandlerClass<T extends AnyWidget> = _RpcHandlerClass<
  RpcType<T>,
  IWidgetHandler<T>
>;

export type IWidgetHandler<T extends AnyWidget> = IRpcHandler<T> &
  {
    [K in string &
      keyof _WidgetCommandsOld<WidgetType<T>> as `$${K}Command`]: ToAsync<
      _WidgetCommandsOld<WidgetType<T>>[K]
    >;
  };

export type IWidget<T extends AnyWidget = AnyWidget> = Widget<
  Override<
    WidgetType<T>,
    {
      Commands: {};
      Children: {};
    }
  >
>;

export type WidgetConnectionClass<T extends TWidget> = new (
  widget: AnyWidget,
  path: any[],
  command: RpcCommand
) => _WidgetConnection<T>;

export type _WidgetCommandsOld<T extends TWidget> = {
  getElement(state?: T["ElementState"]): T["Element"];
} & T["Commands"];

export type _WidgetChildren<T extends TWidget> = PickByValue<
  T["Controller"],
  AnyRpc
>;

export type _WidgetCommands<T extends TWidget> = PickByValue<
  T["Controller"],
  Fn
>;

export type _WidgetConnection<T extends TWidget> = T["Connection"] & {
  $widget: Widget<T>;
  $path: any[];
  $command: RpcCommand;

  $childCommand(key: string, payload, path?: any[]): Promise<any>;

  $widgetCommand<K extends keyof _WidgetCommandsOld<T>>(
    key: string & K,
    ...args: Parameters<_WidgetCommandsOld<T>[K]>
  ): Promise<ReturnType<_WidgetCommandsOld<T>[K]>>;

  $getWidgetCommand<K extends keyof _WidgetCommandsOld<T>>(
    key: string & K
  ): ToAsync<_WidgetCommandsOld<T>[K]>;

  $getChildConnection<K extends keyof T["Children"]>(
    key: K
  ): RpcConnection<T["Children"][K]>;

  getElement: ToAsync<_WidgetCommandsOld<T>["getElement"]>;
} & {
    [K in string &
      keyof T["Controller"] as `${K}X`]: T["Controller"][K] extends AnyRpc
      ? RpcConnection<any>
      : ToAsync<Extract<T["Controller"][K], Fn>>;
  };

export type AnyWidget = Widget<TWidget>;

export function Widget<R extends AnyWidget, T extends TWidget = WidgetType<R>>(
  options: WidgetOptions<T>
): Widget<T> {
  const {
    isGenericConfig = false,
    props = {},
    handler,
    children,
    connection: connectionProps,
  } = (options as any) as WidgetOptions<TWidget>;

  class Connection extends BaseWidgetConnection {}

  for (const [key, getProp] of entries(connectionProps)) {
    const desc: PropertyDescriptor = {
      get() {
        return getProp(this);
      },
    };
    Lazy()(Connection.prototype, key, desc);
  }

  return <any>Rpc<AnyWidget>({
    handler,
    isGenericConfig,
    children: override(RpcFnMap("getElement"), children || {}),
    props: assignDescriptors(props as {}, {
      widgetConnectionClass: Connection,
    }),
    connect($path, $command) {
      return new this.widgetConnectionClass(this, $path, $command);
    },
  });
}

/////////////

export type AnyWidgetConnection = RpcConnection<AnyWidget>;

export type BasedWidget<T extends TWidget = TWidget> = BasedRpc<
  RpcType<Widget<T>>
>;

export type WidgetType<T extends BasedWidget> = RpcType<T>["TWidget"];
export type WidgetElementState<
  T extends BasedWidget
> = WidgetType<T>["ElementState"];

export type WidgetElement<T extends BasedWidget> = WidgetType<T>["Element"];
