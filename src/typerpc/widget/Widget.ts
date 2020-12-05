// TODO: remove controller.
import { assignDescriptors } from "../../common/object/assignDescriptors";
import { entries } from "../../common/object/entries";
import { keys } from "../../common/object/keys";
import { override } from "../../common/object/override";
import { Lazy } from "../../common/patterns/lazy";
import { ExtractKeys } from "../../common/typings2/ExtractKeys";
import { Fn } from "../../common/typings2/Fn";
import { IfNever } from "../../common/typings2/IfNever";
import { Override } from "../../common/typings2/Override";
import { PartialUndefinedKeys } from "../../common/typings2/PartialUndefinedKeys";
import { PickByValue } from "../../common/typings2/PickByValue";
import { Pluck } from "../../common/typings2/Pluck";
import { UndefinedIfEmptyObject } from "../../common/typings2/UndefinedIfEmptyObject";
import {
  _RpcHandlerClass,
  AnyRpc,
  BasedRpc,
  IRpcHandler,
  Rpc,
  RpcCommand,
  RpcConnection,
  RpcIsGenericConfigOption,
  RpcPropsOption,
  RpcType,
  TRpc,
} from "../Rpc";
import { RpcFnMap } from "../rpc-fn/RpcFn";
import { AnyRpcRecord } from "../rpc-map/RpcMap";
import { BaseWidgetConnection } from "./BaseWidgetConnection";

export type TWidget = {
  Controller: Record<string, Fn | AnyRpc>;

  Config: TRpc["Config"];
  Handler: TRpc["Handler"];
  Props: TRpc["Props"];
  Element: object;
  ElementState: any;
};

export type ToAsync<T extends Fn> = (
  ...args: Parameters<T>
) => Promise<ReturnType<T>>;

export type ToAsyncMap<T extends Record<string, Fn>> = {
  [K in keyof T]: ToAsync<T[K]>;
};

export type Widget<T extends TWidget> = Rpc<{
  TWidget: T;

  Widget: T;

  Payload: [string, any[]];

  Children: _WidgetChildren<T>;

  Config: T["Config"];

  Handler: T["Handler"] & {
    getElement(state: T["ElementState"] | undefined): Promise<T["Element"]>;
  };

  Props: T["Props"] & {
    widgetConnectionClass: WidgetConnectionClass<T>;
  };

  Connection: _WidgetConnection<T>;
}>;

export type WidgetControllerOptions<T extends Pick<T, "Controller">> = {
  children: UndefinedIfEmptyObject<PickByValue<T["Controller"], AnyRpc>>;

  commands: UndefinedIfEmptyObject<
    Record<ExtractKeys<T["Controller"], Fn>, true>
  >;
};
export type WidgetOptions<T extends TWidget> = PartialUndefinedKeys<
  {
    isGenericConfig: RpcIsGenericConfigOption<T>;

    props: RpcPropsOption<T>;
  } & WidgetControllerOptions<T>,
  {
    type?: Function;
    handler: WidgetHandlerClass<Widget<T>>;
  }
>;

export type WidgetHandlerClass<T extends AnyWidget> = _RpcHandlerClass<
  RpcType<T>,
  IWidgetHandler<T>
>;

export type IWidgetHandler<T extends AnyWidget> = IRpcHandler<T> &
  {
    [K in string &
      keyof _WidgetCommands<WidgetType<T>> as `$${K}Command`]: ToAsync<
      Extract<Pluck<_WidgetCommands<WidgetType<T>>, K>, Fn>
    >;
  };

export type WidgetWithoutController<T extends AnyWidget = AnyWidget> = Widget<
  Override<
    WidgetType<T>,
    {
      Controller: {};
    }
  >
>;

export type WidgetConnectionClass<T extends TWidget> = new (
  widget: AnyWidget,
  path: any[],
  command: RpcCommand
) => _WidgetConnection<T>;

export type _WidgetChildren<T extends TWidget> = PickByValue<
  T["Controller"],
  AnyRpc
>;

export type _WidgetCommands<T extends TWidget> = PickByValue<
  T["Controller"],
  Fn
> & {
  getElement(state?: T["ElementState"]): T["Element"];
};

export type _WidgetConnection<T extends TWidget> = {
  $widget: Widget<T>;
  $path: any[];
  $command: RpcCommand;
} & {
  [K in string & keyof _WidgetCommands<T>]: ToAsync<
    Extract<_WidgetCommands<T>[K], Fn>
  >;
} &
  {
    [K in string & keyof _WidgetChildren<T>]: RpcConnection<
      Extract<_WidgetChildren<T>[K], AnyRpc>
    >;
  };

export type AnyWidget = Widget<TWidget>;

export function Widget<R extends AnyWidget, T extends TWidget = WidgetType<R>>(
  options: WidgetOptions<T>
): Widget<T> {
  const {
    isGenericConfig = false,
    props = {},
    handler,
    type,
    children = {},
    commands,
  } = (options as any) as WidgetOptions<WidgetType<WidgetWithoutController>>;

  class Connection extends BaseWidgetConnection {}

  for (const key of keys((commands as Record<string, any>) || {})) {
    Connection.prototype[key] = function (this: AnyWidgetConnection, ...args) {
      return this.$command(this.$path, [key, args]);
    };
  }

  for (const [key, child] of entries((children as AnyRpcRecord) || {})) {
    const desc: PropertyDescriptor = {
      get(this: AnyWidgetConnection) {
        return child.createRpcConnection([...this.$path, key], this.$command);
      },
    };
    Lazy()(Connection.prototype, key, desc);
    Object.defineProperty(Connection.prototype, key, desc);
  }

  return <any>Rpc<WidgetWithoutController>({
    handler,
    isGenericConfig,
    children,
    type,
    props: assignDescriptors(props as {}, {
      widgetConnectionClass: Connection as any,
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
