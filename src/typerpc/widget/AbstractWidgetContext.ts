import {Lazy} from "../../common/patterns/lazy";
import {RequireOptionalKeys} from "../../common/typings";
import {AnyContextualRpc, ContextualRpcContext, ContextualRpcProps, ContextualRpcType} from "../ContextualRpc";
import {RpcConfig} from "../Rpc";
import {AnyWidget, BaseWidgetContext, WidgetConfig, WidgetController, WidgetElement, WidgetType} from "./Widget";

export abstract class AbstractWidgetContext<T extends AnyWidget,
    C = WidgetConfig<WidgetType<T>>>
    implements BaseWidgetContext<WidgetType<T>> {


    config:

        C extends undefined ? NonNullable<RequireOptionalKeys<C>>: C;

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


    @Lazy() get controllerContext(): ContextualRpcContext<Extract<WidgetController<T>, AnyContextualRpc>> {
        // @ts-expect-error
        return this.props.controller.getContext(
            this.getControllerConfig()
        )
    }


    abstract getControllerConfig(): RpcConfig<WidgetController<T>> ;

    abstract getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>>;


}
