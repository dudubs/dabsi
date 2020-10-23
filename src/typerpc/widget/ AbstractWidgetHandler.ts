import { Lazy } from "../../common/patterns/lazy";
import { RequireOptionalKeys } from "../../common/typings";
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
  WidgetType,
} from "./Widget";

export abstract class AbstractWidgetHandler<
    R extends AnyWidget,
    T extends TWidget = WidgetType<R>
  >
  extends AbstractRpcHandler<R>
  implements IRpcHandler<IWidget> {
  abstract getControllerConfig(): RpcUnresolvedConfig<WidgetController<R>>;

  abstract getElement(): Promise<RequireOptionalKeys<WidgetElement<R>>>;

  get controller(): WidgetController<R> {
    return this.rpc.widget.controller;
  }

  @Lazy() get controllerHandler(): Promise<
    RpcResolvedHandler<WidgetController<R>>
  > {
    return this.controller.resolveRpcHandler(
      this.getControllerConfig()
    ) as Promise<RpcResolvedHandler<WidgetController<R>>>;
  }

  async handle([key, payload]: [string, any]): Promise<any> {
    switch (key) {
      case "getElement":
        return this.getElement();
      case "controller":
        return this.controllerHandler.then((handler) =>
          handler.handle(payload)
        );
      default:
        const handler = this.rpc.widget.commands[key];
        if (!handler) {
          throw new Error(`No command handler for "${key}".`);
        }
        return this[handler](...payload);
    }
  }
}
