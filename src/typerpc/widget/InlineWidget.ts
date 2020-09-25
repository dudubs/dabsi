import {ValueOrAwaitableFn} from "../input/ValueOrAwaitableFn";
import {NoRpc} from "../NoRpc";
import {AnyRpc, RpcConfig} from "../Rpc";
import {InlineWidgetContext} from "./InlineWidgetContext";
import {Widget} from "./Widget";

export type InlineWidget<E extends object, R extends AnyRpc> = Widget<{
    Connection: {}

    Context: {}

    Props: {}

    Handler: {}

    Config:
        R extends NoRpc ?
            ValueOrAwaitableFn<E> : {
                readonly controllerConfig: RpcConfig<R>
                element: ValueOrAwaitableFn<E>
            }

    Element: E

    Controller: R
}>;


export function InlineWidget<E extends object>() {
    return <R extends AnyRpc = NoRpc>(controller?: R) => {
        return <any>Widget<InlineWidget<any, AnyRpc>>({
            isGenericConfig: false,
            controller,
            context: InlineWidgetContext
        })
    }
}
