import { Override } from "@dabsi/common/typings2/Override";
import {
  AnyInput,
  Input,
  InputType,
  TInput,
} from "@dabsi/old-typerpc/input/Input";

export type InputHook<R extends AnyInput, T extends Partial<TInput>> = Input<
  Extract<Override<InputType<R>, T>, TInput>
>;
