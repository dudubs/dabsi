import {Awaitable} from "../../common/typings";
import {ElementWidgetContext} from "./ElementWidgetContext";
import {RpcConfig} from "../Rpc";
import {AnyWidget, Widget, WidgetElement} from "./Widget";

export type ElementWidget<E, T extends AnyWidget> = Widget<{
    Props: {},
    Config: {
        getElement: () => Awaitable<E>,
        target: RpcConfig<T>
    }
    Element: [E, WidgetElement<T>]
    Controller: T,
    Connection: {}
    Handler: {}
    Context: {}
}>;

/*

    const Page = RpcConfigu(
        WidgetElement<{title: string}>>()(),

    )
 */
export function ElementWidget<E>() {
    return <T extends AnyWidget>(target: T): ElementWidget<E, T> => {
        return <any>Widget<ElementWidget<E, AnyWidget>>({
            controller: target,
            context: {
                getControllerConfig() {
                    return this.config.target
                },
                async getElement() {
                    return [
                        await this.config.getElement(),
                        await this.props.controller
                            .getContext(this.config.target)
                            .getElement()
                    ]
                }
            },
            getContextClass/**/: () => ElementWidgetContext,
        })
    }
}


