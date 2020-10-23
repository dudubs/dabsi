import { Lazy } from "../../common/patterns/lazy";
import {
  Awaited,
  PluckRequired,
  RequireOptionalKeys,
} from "../../common/typings";
import {
  AnyContextualRpc,
  ContextualRpcContext,
  ContextualRpcProps,
  ContextualRpcType,
} from "./ContextualRpc";
import { RpcConfigOld } from "./Old";
import { GenericConfig } from "../GenericConfig";
import {
  AnyWidget,
  BaseWidgetContextOld,
  WidgetConfig,
  WidgetController,
  WidgetElement,
  WidgetType,
} from "../widget/Widget";

export abstract class AbstractWidgetContext<T extends AnyWidget>
  implements BaseWidgetContextOld<WidgetType<T>> {
  config: NonNullable<WidgetConfig<WidgetType<T>>>;

  get controllerProps(): PluckRequired<WidgetController<T>, "props"> {
    // @ts-expect-error
    return this.props.controller.props;
  }

  constructor(
    public props: ContextualRpcProps<T>,
    config: WidgetConfig<WidgetType<T>>
  ) {
    this.config = config ?? <any>{};

    if (this.debug) {
      console.log(`debugging ${this.constructor.name}:`);
      this.debug();
    }
  }

  protected debug?();

  @Lazy() get controllerContext(): ContextualRpcContext<
    Extract<WidgetController<T>, AnyContextualRpc>
  > {
    // @ts-expect-error
    return this.props.controller.getContext(this.getControllerConfig());
  }

  abstract getControllerConfig(): RpcConfigOld<WidgetController<T>>;

  abstract getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>>;
}
