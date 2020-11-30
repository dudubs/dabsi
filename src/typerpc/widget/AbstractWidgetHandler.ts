import { mapObjectAsync } from "../../common/object/mapObject";
import { AbstractRpcHandler } from "../AbstractRpcHandler";
import { RpcPayload } from "../Rpc";
import {
  AnyWidget,
  IWidget,
  IWidgetHandler,
  WidgetElement,
  WidgetElementState,
} from "./Widget";

export abstract class AbstractWidgetHandler<T extends AnyWidget>
  extends AbstractRpcHandler<T>
  implements IWidgetHandler<IWidget> {
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
