import { ReactElement, RefCallback } from "react";
import { If } from "@dabsi/common/typings2/boolean";
import { Is } from "@dabsi/common/typings2/boolean/Is";
import { Renderer } from "@dabsi/react/renderer";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { WidgetView, WidgetViewProps } from "@dabsi/typerpc/widget/WidgetView";
import {
  AnyInput,
  AnyInputConnection,
  BasedInput,
  ErrorOrValue,
  InputError,
  InputValueData,
  InputValueElement,
} from "@dabsi/typerpc/input/Input";
import { InputViewChildren } from "@dabsi/typerpc/input/InputViewChildren";

type InputErrorKey<T> =
  | Extract<T, string>
  | Extract<T, { type: string }>["type"];
export type InputErrorElementMap<R extends BasedInput, T = InputError<R>> = {
  [K in InputErrorKey<T>]?:
    | ReactElement
    | ((error: Extract<T, { type: K }>) => ReactElement);
};
export type InputViewRenderer<C extends AnyInputConnection> = (
  props: InputViewProps<C>
) => ReactElement;

export interface InputViewProps<C extends AnyInputConnection>
  extends WidgetViewProps<C> {
  errorMap?: InputErrorElementMap<C>;

  onChange?: (view: InputView<C>) => void;

  inputRef?: RefCallback<InputView<C>>;

  renderError?(error: InputError<C>): ReactElement;

  onError?(view: InputView<C>): void;

  value?: InputValueElement<C> | undefined;
}

export type InputViewFn<C extends AnyInput> = Renderer<
  InputViewProps<RpcConnection<C>>
>;

export type InputView<C extends AnyInputConnection> = WidgetView<C> & {
  readonly data: InputValueData<C>;
  readonly error: InputError<C> | undefined;
  readonly errorElement: ReactElement | undefined;
  readonly value: InputValueElement<C> | undefined;
  readonly isValidating: boolean;
  readonly children?: InputViewChildren;
  setError(error: InputError<C> | undefined): void;
  setValue(value: InputValueElement<C>): Promise<void>;
  validate(): Promise<boolean>;
};

export type AnyInputView = InputView<AnyInputConnection>;

export type InputErrorOrData<
  C extends AnyInput | AnyInputConnection
> = ErrorOrValue<InputError<C>, InputValueData<C>>;
