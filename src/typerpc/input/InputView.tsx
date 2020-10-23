import { ReactElement, ReactNode, RefCallback } from "react";
import { Renderer } from "../../react/renderer";
import { WidgetView, WidgetViewProps } from "../widget/WidgetView";
import {
  AnyInput,
  AnyInputConnection,
  ErrorOrValue,
  InputError,
  InputValueData,
  InputValueElement,
} from "./Input";
import { InputViewChildren } from "./InputViewChildren";

export type InputViewProps<C extends AnyInputConnection> = WidgetViewProps<
  C
> & {
  errorMap?: { [K in Extract<InputError<C>, string>]?: ReactNode /* Or Fn*/ };

  onChange?: (view: InputView<C>) => void;

  inputRef?: RefCallback<InputView<C>>;

  renderError?(error: InputError<C>): ReactElement;

  onError?(view: InputView<C>): void;

  value: InputValueElement<C> | undefined;
};

export type InputViewFn<C extends AnyInputConnection> = Renderer<
  InputViewProps<C>
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
