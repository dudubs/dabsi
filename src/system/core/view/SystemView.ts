import { defined } from "@dabsi/common/object/defined";
import { entries } from "@dabsi/common/object/entries";
import { getRpcType, Rpc, RpcChild, RpcType } from "@dabsi/typerpc2";
import { getChildRpcType } from "@dabsi/typerpc2/getChildRpcType";
import { AnyInput } from "@dabsi/typerpc2/input/Input";
import { InputViewProps } from "@dabsi/typerpc2/input/InputView";
import { RpcArgs } from "@dabsi/typerpc2/RpcArgs";
import PathPathMap from "@dabsi/typerpc2/RpcPathMap";
import { AnyWidget } from "@dabsi/typerpc2/widget/Widget";
import { WidgetViewProps } from "@dabsi/typerpc2/widget/WidgetView";
import { ReactWrapper } from "@dabsi/view/react/ReactWrapper";
import React from "react";

export type SystemViewComponentMap = RpcPathMap<SystemViewComponent<any>>;

export type SystemViewComponent<T extends AnyWidget> = React.ComponentType<
  SystemViewComponentProps<T>
>;

const globalComponentMap = new RpcPathMap<SystemViewComponent<any>>();

SystemView.ComponentMapContext = React.createContext(globalComponentMap);

export type SystemViewStylesheet<T extends Rpc> =
  | SystemViewStylesheet.ForWidget<T>
  | SystemViewStylesheet.ForRpc<T>
  | (SystemViewStylesheet.ForWidget<T> | SystemViewStylesheet.ForRpc<T>)[];

export type SystemViewBuilderFn = <T extends Rpc>(
  rpcType: RpcType<T>,
  options: SystemViewStylesheet<T>
) => void;

export type SystemViewBuilder = (build: SystemViewBuilderFn) => void;

export namespace SystemViewStylesheet {
  export type Includer = {
    $include(builder: SystemViewBuilderFn);
  };

  export type Wrapper<T extends AnyWidget> = {
    $wrapper: React.ComponentType<{
      children: React.ReactElement<SystemViewComponentProps<T>>;
    }>;
  };
  export type ForRpc<T extends Rpc> = {
    [K in keyof T]?: T[K] extends RpcChild<infer U>
      ? SystemViewStylesheet<U>
      : never;
  };

  export type ForWidget<T> = T extends AnyWidget
    ? SystemViewComponent<T> | SystemViewStylesheet.Wrapper<T> | Includer
    : never;
}

export type SystemViewComponentProps<T extends AnyWidget> = T extends AnyInput
  ? InputViewProps<T>
  : WidgetViewProps<T>;

export type SystemViewProps<T extends Rpc, P> = P & {
  build?: SystemViewBuilder;
  stylesheet?: SystemViewStylesheet<T> | (() => SystemViewStylesheet<T>);
  children?(props: P): React.ReactElement;
};

export function SystemView<T extends AnyInput>(
  props: SystemViewProps<T, InputViewProps<T>>
): React.ReactElement;

export function SystemView<T extends AnyWidget>(
  props: SystemViewProps<T, WidgetViewProps<T>>
): React.ReactElement;

export function SystemView(props: {
  build: SystemViewBuilder;
  children: React.ReactElement;
}): React.ReactElement;

export function SystemView({
  children,
  stylesheet,
  build,
  ...componentProps
}: {
  build?;
  children?;
  stylesheet?;
  connection?;
}): React.ReactElement {
  return ReactWrapper(() => {
    // connection & build? & children?
    // build & children

    const widgetType =
      componentProps.connection && getRpcType(componentProps.connection);

    const parentComponentMap = React.useContext(SystemView.ComponentMapContext);

    const componentMap = React.useMemo(() => {
      const map = new RpcPathMap(parentComponentMap);
      build?.((rpcType, options) => {
        __defineStylesheet(map, rpcType, options);
      });
      stylesheet &&
        widgetType &&
        __defineStylesheet(
          map,
          widgetType,
          typeof stylesheet === "function" ? stylesheet() : stylesheet
        );

      return map.isEmpty() ? parentComponentMap : map;
    }, [parentComponentMap, typeof stylesheet, widgetType]);

    if (componentMap !== parentComponentMap) {
      ReactWrapper.push(children =>
        React.createElement(SystemView.ComponentMapContext.Provider, {
          value: componentMap,
          children,
        })
      );
    }

    if (widgetType) {
      if (typeof children === "function") {
        return children(componentProps);
      }

      const component = React.useMemo(() => {
        const args = RpcArgs.get(componentProps.connection);
        const path = args.getPath().filter(item => typeof item === "string");
        const rootRpcType = args.getRootRpcType();
        return componentMap.get(rootRpcType, path);
      }, [componentMap]);

      if (!component) {
        return React.createElement(
          React.Fragment,
          null,
          `NO_SYSTEM_VIEW_FOR<${widgetType.name}>`
        );
      }
      return React.createElement(component, <any>componentProps);
    }

    return children;
  });
}

export namespace SystemView {
  export function build(builder: SystemViewBuilder) {
    builder((rpcType, stylesheet) => {
      __defineStylesheet(globalComponentMap, rpcType, <any>stylesheet);
    });
  }
}

// o +
function __defineStylesheet(
  map: SystemViewComponentMap,
  rpcType: RpcType,
  stylesheet: SystemViewStylesheet<any>
) {
  define(rpcType, [], stylesheet);

  function define(rpcType: RpcType, childKeys: string[], options: any) {
    if (Array.isArray(options)) {
      options.forEach(options => {
        define(rpcType, childKeys, options);
      });
      return;
    }

    const wrapper = (options as SystemViewStylesheet.Wrapper<any>).$wrapper;
    if (typeof wrapper === "function") {
      const component = defined(
        map.get(rpcType, childKeys),
        () =>
          `Can't wrap ${childKeys.join(".")} because no have component for ${
            getChildRpcType(rpcType, childKeys).name
          }`
      );
      define(rpcType, childKeys, props => {
        return React.createElement(wrapper, {
          children: React.createElement(component, props),
        });
      });
      return;
    }

    const includer = (options as SystemViewStylesheet.Includer).$include;
    if (typeof includer === "function") {
      includer((rpcType, options) => {
        define(rpcType, [] /* no- childKeys, used only for rpc-type */, options);
      });
    }

    if (typeof options === "object") {
      for (const [childKey, childOptions] of entries(options as {})) {
        define(rpcType, [...childKeys, childKey], childOptions);
      }
      return;
    }

    if (typeof options !== "function") {
      throw new TypeError(`Invalid SystemView options (${typeof options}).`);
    }

    map.set(rpcType, childKeys, (options as any) as SystemViewComponent<any>);
  }
}

export const defineSystemViewCompoent = __defineStylesheet as {
  <T extends Rpc>(
    map: SystemViewComponentMap,
    rpcType: RpcType<T>,
    options: SystemViewStylesheet<T>
  ): void;
};
