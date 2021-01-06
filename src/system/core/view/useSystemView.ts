import { useContextHook } from "@dabsi/react/useContextHook";
import { useProviderContext } from "@dabsi/react/useProvider";
import {
  SystemViewContext,
  SystemViewProps,
} from "@dabsi/system/core/view/SystemView";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { AnyWidget } from "@dabsi/typerpc/widget/Widget";
import React, { createElement } from "react";

export function useSystemView<T extends AnyWidget>(
  widget: T,
  renderer: (
    props: SystemViewProps<RpcConnection<T>>,
    view: (props: SystemViewProps<RpcConnection<T>>) => React.ReactElement
  ) => SystemViewProps<RpcConnection<T>> | React.ReactElement
) {
  const providers = useProviderContext(useSystemView, () => {
    const providers = [] as {
      widget: T;
      renderer;
    }[];

    useContextHook(SystemViewContext, context => {
      const componentMap = new Map(context.componentMap.entries());
      providers.forEach(p => {
        const prev =
          componentMap.get(p.widget) ||
          (p.widget.rpcType && componentMap.get(p.widget.rpcType));
        componentMap.set(p.widget, props => {
          const result = p.renderer(props, prev);
          if (React.isValidElement(result)) return result;
          return createElement(prev!, result);
        });
      });
      return { ...context, componentMap };
    });

    return providers;
  });
  providers.push({ widget, renderer });
}
