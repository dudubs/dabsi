import { testMetaType } from "../../common/MetaType";
import { Lazy } from "../../common/patterns/lazy";
import { RequireOptionalKeys } from "../../common/typings2/RequireOptionalKeys";
import { AbstractRpcHandler } from "../AbstractRpcHandler";
import {
  IRpcHandler,
  RpcPayload,
  RpcResolvedHandler,
  RpcUnresolvedConfig,
} from "../Rpc";
import {
  AnyWidget,
  IWidget,
  IWidgetHandler,
  WidgetController,
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
