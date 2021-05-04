import { defined } from "@dabsi/common/object/defined";
import { entries } from "@dabsi/common/object/entries";
import { getRpcType, Rpc, RpcChild, RpcType } from "@dabsi/typerpc2";
import { getRpcChildType } from "@dabsi/typerpc2/getRpcMetadata";
import { AnyInput } from "@dabsi/typerpc2/input/Input";
import { InputViewProps } from "@dabsi/typerpc2/input/InputView";
import { RpcArgs } from "@dabsi/typerpc2/RpcArgs";
import { RpcChildMap } from "@dabsi/typerpc2/RpcChildMap";
import { AnyWidget } from "@dabsi/typerpc2/widget/Widget";
import { WidgetViewProps } from "@dabsi/typerpc2/widget/WidgetView";
import { ReactWrapper } from "@dabsi/view/react/ReactWrapper";
import React from "react";

type SystemViewComponentMap = RpcChildMap<SystemViewComponent<any>>;

type SystemViewComponent<T extends AnyWidget> = React.ComponentType<
  SystemViewComponentProps<T>
>;

type OptionsForWidget<T> = T extends AnyWidget
  ?
      | SystemViewComponent<T>
      | {
          $wrapper: React.ComponentType<{
            children: React.ReactElement<SystemViewComponentProps<T>>;
          }>;
        }
  : never;

const globalComponentMap = new RpcChildMap<SystemViewComponent<any>>();

const ComponentMapContext = React.createContext(globalComponentMap);

export type SystemViewOptions<T extends Rpc> =
  | OptionsForWidget<T>
  | OptionsForRpc<T>
  | (OptionsForWidget<T> | OptionsForRpc<T>)[];

type OptionsForRpc<T extends Rpc> = {
  [K in keyof T]?: T[K] extends RpcChild<infer U>
    ? SystemViewOptions<U>
    : never;
};
export type SystemViewComponentProps<T extends AnyWidget> = T extends AnyInput
  ? InputViewProps<T>
  : WidgetViewProps<T>;

export type SystemViewProps<T extends AnyWidget> = WidgetViewProps<T> & {
  children?(define: any);
  options?: SystemViewOptions<T>;
};

export function SystemView<T extends AnyWidget>({
  children,
  options,
  ...componentProps
}: SystemViewProps<T>): React.ReactElement {
  const widgetType: RpcType<AnyWidget> = getRpcType(componentProps.connection);

  const parentComponentMap = React.useContext(ComponentMapContext);

  const componentMap = React.useMemo(() => {
    if (!options) {
      return parentComponentMap;
    }
    const map = new RpcChildMap(parentComponentMap);
    _defineComponent(parentComponentMap, widgetType, options);
    return map;
  }, [parentComponentMap, typeof options, widgetType]);

  if (componentMap !== parentComponentMap) {
    ReactWrapper.push(children =>
      React.createElement(ComponentMapContext.Provider, {
        value: componentMap,
        children,
      })
    );
  }

  const component = React.useMemo(
    () =>
      componentMap.get(
        widgetType,
        RpcArgs.get(componentProps.connection)
          .getPath()
          .filter(item => typeof item === "string")
      ),
    [componentMap]
  );

  if (!component) {
    return React.createElement(
      React.Fragment,
      null,
      `NO_SYSTEM_VIEW_FOR<${widgetType.name}>`
    );
  }

  return React.createElement(component, componentProps);
}

export namespace SystemView {
  export function define<T extends Rpc>(
    rpcType: RpcType<T>,
    options: SystemViewOptions<T>
  ) {
    _defineComponent(globalComponentMap, rpcType, options);
  }
}

// <WidgetContainerView connection=[[]]

function _defineComponent(
  map: SystemViewComponentMap,
  rpcType: RpcType,
  options: SystemViewOptions<any>
) {
  define(rpcType, [], options);

  function define(rpcType: RpcType, childKeys: string[], options: any) {
    if (Array.isArray(options)) {
      options.forEach(options => {
        define(rpcType, childKeys, options);
      });
      return;
    }

    const wrapper = options.$wrapper;
    if (typeof wrapper === "function") {
      const component = defined(
        map.get(rpcType, childKeys),
        () =>
          `Can't wrap ${childKeys.join(",")} because no have component for ${
            getRpcChildType(rpcType, childKeys).name
          }`
      );
      define(rpcType, childKeys, props => {
        return React.createElement(wrapper, {
          children: React.createElement(component, props),
        });
      });
      return;
    }

    if (typeof options === "object") {
      for (const [childKey, childOptions] of entries(options as {})) {
        define(getRpcChildType(rpcType, childKey), [
          ...childKeys,
          childKey,
        ], childOptions);
      }
      return;
    }

    if (typeof options !== "function") {
      throw new TypeError(`Invalid SystemView options (${typeof options}).`);
    }

    map.set(rpcType, childKeys, (options as any) as SystemViewComponent<any>);
  }
}
