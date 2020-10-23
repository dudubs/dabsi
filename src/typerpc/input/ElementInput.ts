import { Expect } from "../../common/typings";
import { ElementWidget } from "../old/ElementWidget";
import { WidgetHook, WidgetType } from "../widget/Widget";
import { AnyInput } from "./Input";
import { InputHook } from "./InputHook";
import { TextInput } from "./text-input/TextInput";

// Meta

export type ElementInput<E, T extends AnyInput> = InputHook<
  T,
  WidgetType<ElementWidget<E, T>>
>;

export const ElementInput = ElementWidget as <E>() => <T extends AnyInput>(
  target: T
) => ElementInput<E, T>;
