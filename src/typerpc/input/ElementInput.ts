import {Awaitable} from "../../common/typings";
import {RpcConfig} from "../Rpc";
import {ElementWidget} from "../widget/ElementWidget";
import {WidgetElement} from "../widget/Widget";
import {AnyInput, Input, InputType} from "./Input";


// Meta

export type ElementInput<E, T extends AnyInput> = Input<Omit<InputType<T>, "Element" | "Config"> & {
    SubElement: E;
    SubInput: T;

    Element: [E, WidgetElement<T>]
    Config: {
        getElement(): Awaitable<E>;
        targetConfig: RpcConfig<T>
    }
}>;
export const ElementInput = ElementWidget as
    <E>() => <T extends AnyInput>(target: T) => ElementInput<E, T>;
