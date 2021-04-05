// TODO: remove controller.
import { assignDescriptors } from "@dabsi/common/object/assignDescriptors";
import { entries } from "@dabsi/common/object/entries";
import { keys } from "@dabsi/common/object/keys";
import Lazy from "@dabsi/common/patterns/Lazy";
import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { Fn } from "@dabsi/common/typings2/Fn";
import { Override } from "@dabsi/common/typings2/Override";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { PickByValue } from "@dabsi/common/typings2/PickByValue";
import { PluckDefined } from "@dabsi/common/typings2/Pluck";
import { UndefinedIfEmptyObject } from "@dabsi/common/typings2/UndefinedIfEmptyObject";
import {
  AnyRpc,
  BasedRpc,
  IRpcHandler,
  Rpc,
  RpcCommand,
  RpcConnection,
  RpcIsConfigCanBeUndefinedOption,
  RpcIsGenericConfigOption,
  RpcPropsOption,
  RpcType,
  TRpc,
  _RpcHandlerClass,
} from "@dabsi/typerpc/Rpc";
import { AnyRpcRecord } from "@dabsi/typerpc/rpc-map/RpcMap";
import { BaseWidgetConnection } from "@dabsi/typerpc/widget/BaseWidgetConnection";

export type TWidget = {
  Controller: Record<string, Fn | AnyRpc>;

  Config: TRpc["Config"];
  Handler: TRpc["Handler"];
  Props: TRpc["Props"];
  Element: object;
  ElementState: any;

  // ViewProps: object;
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
    // move to handler
    isGenericConfig: RpcIsGenericConfigOption<T>;
    isConfigCanBeUndefined: RpcIsConfigCanBeUndefinedOption<T>;
    props: RpcPropsOption<T>;
  } & WidgetControllerOptions<T>,
  {
    type: Function;
    handler: WidgetHandlerClass<Widget<T>>;
  }
>;

export type WidgetHandlerClass<T extends AnyWidget> = _RpcHandlerClass<
  RpcType<T>,
  IWidgetHandler<T>
>;

export type WidgetCommandConfig<
  T extends AnyWidget,
  K extends keyof _WidgetCommands<WidgetType<T>>
> = ToAsync<Extract<PluckDefined<_WidgetCommands<WidgetType<T>>, K>, Fn>>;

export type IWidgetHandler<T extends AnyWidget> = IRpcHandler<T> &
  {
    [K in string &
      keyof _WidgetCommands<
        WidgetType<T>
      > as `$${K}Command`]: WidgetCommandConfig<T, K>;
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
    isConfigCanBeUndefined,
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

  const widget = <any>Rpc<WidgetWithoutController>({
    handler,
    isGenericConfig,
    isConfigCanBeUndefined,
    isConfigFn: false,
    children,
    type,
    props: assignDescriptors(props as {}, {
      widgetConnectionClass: Connection as any,
    }),
    connect($path, $command) {
      return new this.widgetConnectionClass(this, $path, $command);
    },
  });
  isWidgetSet.add(widget);
  return widget;
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

const isWidgetSet = new WeakSet();
export function isWidget(obj): obj is AnyWidget {
  return isWidgetSet.has(obj);
}
export function isWidgetConnection(obj): obj is AnyWidgetConnection {
  return isWidget(obj?.$widget);
}
