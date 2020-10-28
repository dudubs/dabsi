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

  @Lazy() get targetContext():
    | Promise<RpcResolvedHandler<AnyWidget>>
    | undefined {
    if (this.rpc.inlineTarget)
      return this.rpc.inlineTarget.resolveRpcHandler(this.config.targetConfig);
  }

  async handleTarget(payload) {
    if (!this.targetContext) throw new RpcError(`No target`);
    return this.targetContext.then(c => c.handle(payload));
  }

  async getElement(): Promise<WidgetElement<T>> {
    this.config.getElement();
    return [
      await this.config.getElement(),
      await this.targetContext?.then(c => c.getElement()),
    ];
  }
}
