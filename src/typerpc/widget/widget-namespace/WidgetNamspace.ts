import { WidgetNamespaceHandler } from "./WidgetNamespaceHandler";
import { RpcConfig, RpcConnection } from "../../Rpc";
import { RpcNamespace } from "./../../RpcNamespace";
import { AnyWidget, Widget, WidgetElement } from "./../Widget";

export type WidgetNamespace = Widget<{
  Controller: {
    ns: RpcNamespace<AnyWidget>;
  };

  Config: RpcConfig<RpcNamespace<AnyWidget>>;

  Handler: {};

  Props: {
    register<T extends AnyWidget>(
      name: string,
      widget: T
    ): [T, RpcConnection<T>];
  };

  Element: {
    elementMap: Record<string, WidgetElement<AnyWidget>>;
  };

  ElementState: Record<string, any>;
}>;

export function WidgetNamespace(): WidgetNamespace {
  const ns = RpcNamespace();
  return Widget<WidgetNamespace>({
    handler: WidgetNamespaceHandler,
    type: WidgetNamespace,
    children: { ns },
    props: {
      register(name, rpc) {
        return ns.register(name, rpc);
      },
    },
  });
}
