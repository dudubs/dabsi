import { Lazy } from "../../../common/patterns/lazy";
import { RpcError, RpcResolvedHandler, RpcUnresolvedConfig } from "../../Rpc";
import { AbstractWidgetHandler } from "../AbstractWidgetHandler";
import { AnyInlineWidget } from "./InlineWidget";
import {
  AnyWidget,
  IWidgetHandler,
  WidgetController,
  WidgetElement,
} from "../Widget";

export class InlineWidgetHandler<T extends AnyInlineWidget>
  extends AbstractWidgetHandler<T>
  implements IWidgetHandler<AnyInlineWidget> {
  getControllerConfig(): RpcUnresolvedConfig<WidgetController<T>> {
    return this.config.controllerConfig;
  }

  @Lazy() get targetHandler():
    | Promise<RpcResolvedHandler<AnyWidget>>
    | undefined {
    if (this.rpc.inlineTarget)
      return this.rpc.inlineTarget.resolveRpcHandler(this.config.targetConfig);
  }

  async handleTarget(payload) {
    if (!this.targetHandler) throw new RpcError(`No target`);
    return this.targetHandler.then(c => c.handle(payload));
  }

  async getElement(state?): Promise<WidgetElement<T>> {
    return [
      await this.config.getElement(),
      await (await this.targetHandler)?.getElement(state),
    ];
  }
}
