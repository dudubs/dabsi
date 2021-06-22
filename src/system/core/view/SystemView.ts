import { inspect } from "@dabsi/logging/inspect";
import SystemViewBuilder from "@dabsi/system/core/view/SystemViewBuilder";
import {
  getRpcType,
  isRpcType,
  Rpc,
  RpcLocation,
  RpcType,
} from "@dabsi/typerpc2";
import { AnyInput } from "@dabsi/typerpc2/input/Input";
import { InputViewProps } from "@dabsi/typerpc2/input/InputView";
import { RpcArgs } from "@dabsi/typerpc2/RpcArgs";
import RpcPathMap from "@dabsi/typerpc2/RpcPathMap";
import { AnyWidget } from "@dabsi/typerpc2/widget/Widget";
import { WidgetViewProps } from "@dabsi/typerpc2/widget/WidgetView";
import createFragment from "@dabsi/view/react/createFragment";

import EmptyFragment from "@dabsi/view/react/EmptyFragment";
import RegularText from "@dabsi/view/RegularText";
import React from "react";

export type SystemViewComponent<T extends AnyWidget> = React.ComponentType<
  SystemViewComponentProps<T>
>;

const ComponentMap = new RpcPathMap<SystemViewComponent<any>>();
const ComponentMapContext = React.createContext(ComponentMap);

let _buildCallbacks: (() => void)[] = [];

export type SystemViewComponentProps<T extends AnyWidget> =
  //
  T extends AnyInput
    ? //
      InputViewProps<T>
    : WidgetViewProps<T>;

export type SystemViewProps<T extends Rpc, P> = P & {
  build?(builder: SystemViewBuilder<T>): any;
  children?(props: P): React.ReactElement;
};

export function SystemView<T extends AnyInput>(
  props: SystemViewProps<T, InputViewProps<T>>
): React.ReactElement;

export function SystemView<T extends AnyWidget>(
  props: SystemViewProps<T, WidgetViewProps<T>>
): React.ReactElement;

export function SystemView<T extends Rpc>(props: {
  for?: T;
  build(builder: SystemViewBuilder<T>): any;
  children: React.ReactNode;
}): React.ReactElement;

export function SystemView<T extends Rpc>(
  rpcType: RpcType<T>,
  callback: (builder: SystemViewBuilder<T>) => any
);

export function SystemView(rpcTypeOrProps, callback?): any {
  if (isRpcType(rpcTypeOrProps)) {
    const rpcType = rpcTypeOrProps;
    _buildCallbacks.push(() => {
      callback(
        new SystemViewBuilder(new RpcLocation(rpcType, []), ComponentMap)
      );
    });
    return;
  }

  while (_buildCallbacks.length) {
    const callbacks = _buildCallbacks;
    _buildCallbacks = [];
    for (const callback of callbacks) {
      callback();
    }
  }

  const {
    build,
    children,
    for: buildConnection,
    ...componentProps
  } = rpcTypeOrProps as SystemViewProps<any, WidgetViewProps<any>> & {
    for?: Rpc;
  };

  const parentComponentMap = React.useContext(ComponentMapContext);

  const widgetType =
    componentProps.connection && getRpcType(componentProps.connection);

  const componentMap = React.useMemo(() => {
    if (!build) return parentComponentMap;

    const componentMap = new RpcPathMap(parentComponentMap);

    build(
      new SystemViewBuilder(
        buildConnection
          ? new RpcLocation(getRpcType(buildConnection), [])
          : widgetType
          ? new RpcLocation(widgetType, [])
          : null,
        componentMap
      )
    );

    return componentMap;
  }, [parentComponentMap, widgetType, !build, buildConnection]);

  const widgetLocation = React.useMemo(() => {
    if (!widgetType) return;
    const args = RpcArgs.get(componentProps.connection);
    return new RpcLocation(
      args.getRootRpcType(),
      args.getPath().filter(pathKey => typeof pathKey === "string")
    );
  }, [widgetType]);

  const component = React.useMemo(() => {
    if (!widgetLocation || typeof children === "function") return;
    return componentMap.getByLocation(widgetLocation);
  }, [widgetLocation, componentMap, typeof children]);

  const withProvider = element =>
    React.createElement(ComponentMapContext.Provider, {
      value: componentMap,
      children: element,
    });

  if (widgetType) {
    if (typeof children === "function") {
      return withProvider(children(componentProps));
    }
    if (component) {
      return withProvider(React.createElement(component, componentProps));
    }
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(
        RegularText,
        { variant: "error" },
        `NO_SYSTEM_VIEW_FOR_${inspect(widgetLocation)}`
      )
    );
  }

  return withProvider(
    typeof children === "object"
      ? createFragment(children)
      : null || EmptyFragment
  );
}
