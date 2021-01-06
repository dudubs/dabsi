import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { SystemViewProps } from "@dabsi/system/core/view/SystemView";
import { SystemViewContext } from "@dabsi/system/core/view/SystemView";
import { ComponentType, ReactElement } from "react";
import { AnyWidget } from "@dabsi/typerpc/widget/Widget";
import { useContextHook } from "@dabsi/react/useContextHook";

export type UseSystemViewThemeCallback = (
  define: <T extends AnyWidget>(
    target: T | ((...args: any[]) => T),
    renderer: (
      props: SystemViewProps<RpcConnection<T>>,
      prev: ComponentType<SystemViewProps<RpcConnection<T>>>
    ) => ReactElement
  ) => void
) => void;

export function useSystemViewTheme(callback: UseSystemViewThemeCallback) {
  useContextHook(SystemViewContext, context => {
    const componentMap = new Map(context.componentMap.entries());
    callback((target, renderer) => {
      const prev =
        componentMap.get(target) ||
        componentMap.get((target as AnyWidget).rpcType);
      componentMap.set(target, props => {
        return renderer(props, prev);
      });
    });
    return { ...context, componentMap };
  });
}
