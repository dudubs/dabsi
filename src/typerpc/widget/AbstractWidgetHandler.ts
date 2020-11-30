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
  $getElementCommand = (state?) => this.getElement(state);

  async handle([key, args]: RpcPayload<T>): Promise<any> {
    return this["$" + key + "Command"](...args);
  }

  abstract getElement(
    state: WidgetElementState<T> | undefined
  ): Promise<WidgetElement<T>>;
}
