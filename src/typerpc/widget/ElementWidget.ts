import {Awaitable} from "../../common/typings";
import {RpcConfig} from "../Rpc";
import {AnyWidget, Widget, WidgetElement, WidgetType} from "./Widget";

export type ElementWidget<E, T extends AnyWidget> =
    Widget<Omit<WidgetType<T>, "Element" | "Config"> & {

        SubElement: E;
        SubWidget: T;

        Element: [E, WidgetElement<T>]
        Config: {
            getElement(): Awaitable<E>;
            targetConfig: RpcConfig<T>
        }
    }>;


// ContextualRpcHook()
export function ElementWidget<E>() {
    return <T extends AnyWidget>(target: T): ElementWidget<E, T> => {
        return Object.setPrototypeOf({
            getContext(config) {
                const context = target.getContext.call(this, config.targetConfig);
                return Object.setPrototypeOf({
                    async getElement() {
                        return [
                            await config.getElement(),
                            await context.getElement.call(this)
                        ]
                    }

                }, context)
            }

        }, target);
    }
}


