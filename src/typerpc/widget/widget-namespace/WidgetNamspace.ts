import { WidgetNamespaceHandler } from "./WidgetNamespaceHandler";
import { RpcConfig, RpcConnection } from "@dabsi/typerpc/Rpc";
import { RpcNamespace } from "@dabsi/typerpc/RpcNamespace";
import { AnyWidget, Widget, WidgetElement } from "@dabsi/typerpc/widget/Widget";

export type WidgetNamespace = Widget<{
  Controller: {
    ns: RpcNamespace;
  };

  Config: RpcConfig<RpcNamespace>;

  Handler: {};

  Props: {};

  Element: {
    elementMap: Record<string, WidgetElement<AnyWidget>>;
  };

  ElementState: Record<string, any>;
}>;

export function WidgetNamespace(
  ns: RpcNamespace = RpcNamespace()
): WidgetNamespace {
  return Widget<WidgetNamespace>({
    handler: WidgetNamespaceHandler,
    type: WidgetNamespace,
    children: { ns },
  });
}
