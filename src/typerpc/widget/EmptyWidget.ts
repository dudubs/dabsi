import {NoRpc} from "../NoRpc";
import {RpcConfig} from "../Rpc";
import {AbstractWidgetContext} from "./AbstractWidgetContext";
import {TWidget, Widget, WidgetController, WidgetElement} from "./Widget";


export type EmptyWidget = Widget<{
    Connection: {}

    Context: {}

    Props: {}

    Handler: {}

    Config: undefined

    Element: TWidget['Element']

    Controller: NoRpc
}>

export class EmptyWidgetContext<T extends EmptyWidget>
    extends AbstractWidgetContext<T> {
    getControllerConfig(): RpcConfig<WidgetController<T>> {
        throw new Error()
    }

    getElement(): Promise<WidgetElement<T>> {
        throw new Error()
    }

}

export function EmptyWidget() {
    return Widget<EmptyWidget>({

        context: EmptyWidgetContext
    })
}
