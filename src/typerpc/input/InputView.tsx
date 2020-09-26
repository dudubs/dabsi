import { createElement, Fragment, ReactElement, ReactNode } from "react";
import { Awaitable } from "../../common/typings";
import { Renderer } from "../../react/renderer";
import { ViewState } from "../../react/view/ViewState";
import { WidgetType } from "../widget/Widget";
import { WidgetView, WidgetViewProps } from "../widget/WidgetView";
import {
  AnyInput,
  AnyInputConnection,
  ErrorOrValue,
  InputData,
  InputError,
  InputType,
  InputValueElement,
} from "./Input";

export type InputViewProps<C extends AnyInputConnection> = WidgetViewProps<
  C
> & {
  errorMap?: { [K in Extract<InputError<C>, string>]?: ReactNode /* Or Fn*/ };

  onChange?: (view: InputView<C>) => void;

  inputRef?: (input: InputView<C> | undefined) => void;

  renderError?(error: InputError<C>): ReactElement;

  onError?(error: InputError<C>): void;

  value?: InputValueElement<C>;

  error?: InputError<C>;
};

export type InputViewRenderer<C extends AnyInputConnection> = Renderer<
  InputViewProps<C>
>;
export type AnyInputView = InputView<AnyInputConnection>;
export type InputErrorOrData<
  C extends AnyInput | AnyInputConnection
> = ErrorOrValue<InputError<C>, InputData<C>>;

export abstract class InputView<
  C extends AnyInputConnection,
  P extends InputViewProps<C> = InputViewProps<C>,
  T extends InputType<C> = InputType<C>
> extends WidgetView<C, P> {
  protected updateError?(error: T["Error"] | undefined): void;

  @ViewState("forceUpdateError") protected _error: T["Error"] | undefined;

  @ViewState("forceUpdateValue") protected _value: InputValueElement<C>;

  get error(): T["Error"] | undefined {
    return this._error;
  }

  get value(): InputValueElement<C> {
    return this._value;
  }

  setValue(value: InputValueElement<C>): void {
    this._value = value;
  }

  setError(error: T["Error"] | undefined) {
    this._error = error;
  }

  @ViewState() errorElement: ReactElement | undefined;

  protected isValidValue?: boolean;

  protected getError?(): Awaitable<InputError<C> | undefined>;

  protected updateValue?(value: InputValueElement<C>): void;

  // setInvalidValue?
  async checkError(
    onError?: (error: InputError<C>) => Awaitable
  ): Promise<InputError<C> | undefined> {
    if (this.isValidValue) {
      if (this.hasError) {
        await onError?.(this._error!);
      }
      return;
    }
    this._error = await this.getError?.();
    if (this._error != null) {
      await onError?.(this._error);
      return this._error;
    }
  }

  get hasError() {
    return this._error != null;
  }

  forceUpdateError() {
    this.updateError?.(this._error);
    if (this._error != null)
      this.errorElement = this.renderErrorToElement(this._error);
  }
  async getCheckedData(): Promise<[false] | [true, InputData<C>]> {
    if (!this.hasError)
      return [
        true,
        this.props.connection.props.getDataFromValueElement(this._value),
      ];
    return [false];
  }

  async checkValue(value: InputValueElement<C>) {
    if (value === this._value) {
      return;
    }
    this._value = value;
    const error = await this.checkError();
    if (error != null) {
      this.props.onError?.(this);
      return;
    }
    this.props.onChange?.(this);
  }

  updateViewProps(prevProps: Readonly<P>, nextProps: Readonly<P>) {
    super.updateViewProps(prevProps, nextProps);
  }

  shouldComponentUpdate(
    nextProps: Readonly<P>,
    nextState: Readonly<any>,
    nextContext: any
  ): boolean {
    if (nextProps.value !== this.props.value) {
      this._value = nextProps.value;
    }

    if (nextProps.error !== this.props.error) {
      this._error = nextProps.error;
    }

    return super.shouldComponentUpdate(nextProps, nextState, nextContext);
  }

  forceUpdateValue() {
    this.isValidValue = false;
    this._error = undefined;
    this.updateValue?.(this._value);
  }

  protected updateElement(element: WidgetType<C>["Element"]) {
    this._value =
      this.props.value ??
      this.connectionProps.getValueElementFromElement(element);
  }

  protected renderErrorDefault?(error: T["Error"]): ReactElement;

  renderErrorToElement(error: T["Error"]): ReactElement | undefined {
    // TODO: use this.error
    if (error == null) return;

    const element = this.props.renderError?.(error);
    if (element) return element;

    if (typeof error === "string") {
      if (this.props.errorMap && error in this.props.errorMap) {
        return createElement(Fragment, null, this.props.errorMap[error]);
      }
      // TODO: try to translate with "ERROR_" prefix
    }

    const defaultErrorElement = this.renderErrorDefault?.(error);

    if (defaultErrorElement != null) return defaultErrorElement;
  }

  renderError(): ReactNode {
    if (this.errorElement) return this.errorElement;

    if (typeof this._error === "string") return this._error;

    if (this._error != null) return JSON.stringify(this._error);
  }

  componentDidMount() {
    super.componentDidMount();
    this.props.inputRef?.(this);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.props.inputRef?.(undefined);
  }
}

/*
WidgetElement

InputElement

 */
