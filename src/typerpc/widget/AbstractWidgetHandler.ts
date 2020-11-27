import { Lazy } from "../../common/patterns/lazy";
import { RequireOptionalKeys } from "../../common/typings2/RequireOptionalKeys";
import {
  AbstractRpcHandler,
  IRpcHandler,
  RpcResolvedHandler,
  RpcUnresolvedConfig,
} from "../Rpc";
import {
  AnyWidget,
  IWidget,
  TWidget,
  WidgetController,
  WidgetElement,
  WidgetElementState,
  WidgetType,
} from "./Widget";

export abstract class AbstractWidgetHandler<T extends AnyWidget>
  extends AbstractRpcHandler<T>
  implements IRpcHandler<IWidget> {
  abstract getControllerConfig(): RpcUnresolvedConfig<WidgetController<T>>;

  abstract getElement(
    state: WidgetElementState<T> | undefined
  ): Promise<RequireOptionalKeys<WidgetElement<T>>>;

  @Lazy() get controller(): Promise<RpcResolvedHandler<WidgetController<T>>> {
    return this.rpc.widget.controller.resolveRpcHandler(
      this.getControllerConfig(),
      this
    ) as Promise<RpcResolvedHandler<WidgetController<T>>>;
  }

  async handle([key, payload]: [string, any]): Promise<any> {
    switch (key) {
      case "getElement":
        return this.getElement(payload);
      case "controller":
        return this.controller.then(handler => handler.handle(payload));
      default:
        const handler = this.rpc.widget.commands[key];
        if (!handler) {
          throw new Error(`No command handler for "${key}".`);
        }
        return this[handler](...payload);
    }
  }
}
