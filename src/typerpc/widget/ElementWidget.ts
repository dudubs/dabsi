import {Awaitable} from "../../common/typings";
import {RpcConfig} from "../Rpc";
import {AnyWidget, Widget, WidgetElement, WidgetHook, WidgetType} from "./Widget";


export type TElementWidget<E, T extends AnyWidget> = {

    SubElement: E;

    SubWidget: T;

    Element: [E, WidgetElement<T>]

    Config: {
        getElement(): Awaitable<E>;
        targetConfig: RpcConfig<T>
    }
};

export type ElementWidget<E, T extends AnyWidget> =
    WidgetHook<T, {

        SubElement: E;
        SubWidget: T;

        Element: [E, WidgetElement<T>]

        Config: {
            getElement(): Awaitable<E>;
            targetConfig: RpcConfig<T>
        }
    }>;

export type ElementWidget2<E, T extends AnyWidget> =

    Widget<Omit<WidgetType<T>, "Element" | "Config">
        & TElementWidget<E, T>>;


// ContextualRpcHook()
export function ElementWidget<E>():
    <T extends AnyWidget>(target: T) => ElementWidget<E, T> {
    return target => {
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


