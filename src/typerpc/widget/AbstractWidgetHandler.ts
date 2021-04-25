import { mapObjectAsync } from "@dabsi/common/object/mapObject";
import { AbstractRpcHandler } from "@dabsi/old-typerpc/AbstractRpcHandler";
import { RpcPayload } from "@dabsi/old-typerpc/Rpc";
import {
  AnyWidget,
  WidgetWithoutController,
  IWidgetHandler,
  WidgetElement,
  WidgetElementState,
} from "@dabsi/old-typerpc/widget/Widget";

export abstract class AbstractWidgetHandler<T extends AnyWidget>
  extends AbstractRpcHandler<T>
  implements IWidgetHandler<WidgetWithoutController> {
  $getElementCommand(state?) {
    return this.getElement(state);
  }

  async handle(payload): Promise<any> {
    const [key, args] = payload;
    return this["$" + key + "Command"](...args);
  }

  abstract getElement(
    state: WidgetElementState<T> | undefined
  ): Promise<WidgetElement<T>>;
}
