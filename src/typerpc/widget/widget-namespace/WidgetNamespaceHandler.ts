import { keys } from "@dabsi/common/object/keys";
import { IRpcHandler, RpcResolvedHandler } from "@dabsi/typerpc/Rpc";
import { AbstractWidgetHandler } from "@dabsi/typerpc/widget/AbstractWidgetHandler";
import { AnyWidget, WidgetElementState } from "@dabsi/typerpc/widget/Widget";
import { WidgetNamespace } from "@dabsi/typerpc/widget/widget-namespace/WidgetNamspace";

export type T = WidgetNamespace;

export class WidgetNamespaceHandler
  extends AbstractWidgetHandler<T>
  implements IRpcHandler<T> {
  $nsConfig = this.config;

  async getElement(
    state: WidgetElementState<T> | undefined
  ): Promise<{ elementMap: Record<string, object> }> {
    const nsHandler = await this.getChildHandler("ns");
    const elementMap: any = {};

    for (const key of keys(nsHandler.rpc.children)) {
      const childHandler = (await nsHandler.getChildHandler(
        key as never
      )) as RpcResolvedHandler<AnyWidget>;

      elementMap[key] = await childHandler.getElement(state?.[key]);
    }
    return { elementMap };
  }
}
