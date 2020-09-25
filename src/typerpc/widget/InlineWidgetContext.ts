import {Lazy} from "../../common/patterns/lazy";
import {RequireOptionalKeys} from "../../common/typings";
import {ValueOrAwaitableFn} from "../input/ValueOrAwaitableFn";
import {NoRpc} from "../NoRpc";
import {AnyRpc, RpcConfig} from "../Rpc";
import {AbstractWidgetContext} from "./AbstractWidgetContext";
import {InlineWidget} from "./InlineWidget";
import {WidgetController, WidgetElement} from "./Widget";

export class InlineWidgetContext extends AbstractWidgetContext<InlineWidget<any, AnyRpc>> {

    @Lazy() get inlineConfig(): { controllerConfig, element: ValueOrAwaitableFn<any> } {
        if (this.props.controller === NoRpc) {
            return {
                controllerConfig: null,
                element: this.config
            }
        } else {
            return this.config
        }
    }

    getControllerConfig(): RpcConfig<WidgetController<InlineWidget<any, AnyRpc>>> {
        return this.inlineConfig.controllerConfig
    }

    getElement(): Promise<RequireOptionalKeys<WidgetElement<InlineWidget<any, AnyRpc>>>> {
        return ValueOrAwaitableFn(this.inlineConfig.element)
    }

}
