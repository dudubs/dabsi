import {ContextualRpcProps} from "../ContextualRpc";
import {RpcConfig} from "../Rpc";
import {AnyWidget, BaseWidgetContext, WidgetContextConfig, WidgetController, WidgetElement, WidgetType} from "./Widget";

export abstract class AbstractWidgetContext<T extends AnyWidget>
    implements BaseWidgetContext<WidgetType<T>> {

    constructor(
        public props: ContextualRpcProps<T>,
        public config: WidgetContextConfig<WidgetType<T>>
    ) {

        if (this.debug) {
            console.log(`debugging ${this.constructor.name}:`);
            this.debug();
        }

    }

    protected debug?();


    abstract getControllerConfig(): RpcConfig<WidgetController<T>> ;

    abstract getElement(): Promise<WidgetElement<T>>;


}
