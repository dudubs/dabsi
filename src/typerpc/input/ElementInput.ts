import {ElementWidget} from "../widget/ElementWidget";
import {WidgetType} from "../widget/Widget";
import {AnyInput, Input, InputHook, InputType} from "./Input";


// Meta

export type ElementInput<E, T extends AnyInput> =
    InputHook<T, WidgetType<ElementWidget<E, T>>>;

export const ElementInput = ElementWidget as
    <E>() => <T extends AnyInput>(target: T) => ElementInput<E, T>;
