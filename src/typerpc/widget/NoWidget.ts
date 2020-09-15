import {If, Is, PartialUndefinedKeys} from "../../common/typings";
import {ValueOrAwaitableFn} from "../input/ValueOrAwaitableFn";
import {NoRpc} from "../NoRpc";
import {AnyRpc, RpcConfig} from "../Rpc";
import {CustomWidgetContext} from "./CustomWidgetContext";
import {Widget} from "./Widget";

export type CustomWidget<T extends object, R extends AnyRpc> = Widget<{
    Handler: {},
    Controller: R,
    Props: {},
    Context: {},
    Connection: {}
    Config: PartialUndefinedKeys<{
        getControllerConfig: (() => RpcConfig<R>)
            | If<Is<R, NoRpc>, undefined>
        element: ValueOrAwaitableFn<T>
    }>,
    Element: T
}>;

export function CustomWidget<T extends object>() {
    return <R extends AnyRpc=NoRpc>(controller?: R): CustomWidget<T, R> => {
        return <any>Widget<CustomWidget<any, AnyRpc>>({
            controller,
            context: CustomWidgetContext
        })
    }
}


