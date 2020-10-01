import {
  createElement,
  Fragment,
  ReactElement,
  ReactNode,
  RefCallback,
} from "react";
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
  InputValue,
  InputValueElement,
} from "./Input";
import { InputViewChildren } from "./InputViewChildren";

/*

  - Form -> Input:
    - validate()
    - props.value



 */
export type InputViewProps<C extends AnyInputConnection> = WidgetViewProps<
  C
> & {
  errorMap?: { [K in Extract<InputError<C>, string>]?: ReactNode /* Or Fn*/ };

  onChange?: (view: InputView<C>) => void;

  inputRef?: RefCallback<InputView<C>>;

  renderError?(error: InputError<C>): ReactElement;

  onError?(view: InputView<C>): void;

  value?: InputValueElement<C>;
};

export type InputViewRenderer<C extends AnyInputConnection> = Renderer<
  InputViewProps<C>
>;
export type AnyInputView = InputView<AnyInputConnection>;
export type InputErrorOrData<
  C extends AnyInput | AnyInputConnection
> = ErrorOrValue<InputError<C>, InputData<C>>;

// TODO: AbstractInputView
// TODO: type InputView
export abstract class InputView<
  C extends AnyInputConnection,
  P extends InputViewProps<C> = InputViewProps<C>,
  T extends InputType<C> = InputType<C>
> extends WidgetView<C, P> {
  protected updateError?(error: T["Error"] | undefined): void;

  @ViewState("forceUpdateValue") protected _value: InputValueElement<C>;

  @ViewState("forceUpdateError") protected _error: InputError<C>;

  @ViewState() _errorElement: ReactElement | undefined;

  protected _data: InputData<C>;
  protected _isValidValue: boolean;

  children?: InputViewChildren;

  get errorElement(): ReactElement | undefined {
    return this._errorElement;
  }

  get data(): InputData<C> {
    return this._data;
  }

  get error(): T["Error"] | undefined {
    return this._error;
  }

  get value(): InputValueElement<C> {
    return this._value;
  }

  async setValue(value: InputValueElement<C>): Promise<void> {
    if (this._isValidValue && this._value === value) {
      return;
    }

    this._value = value;
    this._error = await this.getError?.();
    if (this._error != null) {
      this.props.onError?.(this);
      return;
    }
    this._isValidValue = value;
    this.props.onChange?.(this);
  }

  setError(error: T["Error"] | undefined) {
    this._error = error;
  }

  protected getError?(): Awaitable<InputError<C> | undefined>;

  protected updateValue?(value: InputValueElement<C>): void;

  protected updateElement(element: WidgetType<C>["Element"]) {
    this._value =
      this.props.value !== undefined
        ? this.props.value
        : this.connectionProps.getValueElementFromElement(element);
  }

  forceUpdateValue() {
    this._error = undefined;
    this._isValidValue = false;
    this._data = this.connectionProps.getDataFromValueElement(this._value);
    this.updateValue?.(this._value);
  }

  // TODO: ["children", { ... }]
  protected renderErrorElement(): ReactElement | undefined {
    const { error } = this;
    // TODO: use this.error
    if (error == null) return;
    const element = this.props.renderError?.(error);
    if (element) return element;
    if (typeof error === "string") {
      if (this.props.errorMap && error in this.props.errorMap) {
        return createElement(Fragment, null, this.props.errorMap[error]);
      }
    }
    const defaultErrorElement = this.getErrorElement?.(error);
    if (defaultErrorElement != null) return defaultErrorElement;
  }

  forceUpdateError() {
    this._errorElement =
      this._error != null ? this.renderErrorElement() : undefined;

    this.children?.updateError(this._error);
    this.updateError?.(this._error);
  }

  inputWillValidate?(): Awaitable;

  async validate(): Promise<boolean> {
    await this.inputWillValidate?.();
    const error =
      (await this.children?.getError()) ?? (await this.getError?.());
    return null == (this._error = error);
  }

  /*
    submit
    validate
    inputError REQUIRED
    submit
    validate
    inputError  REQUIRED


   */
  updateViewProps(prevProps: Readonly<P>, nextProps: Readonly<P>) {
    super.updateViewProps(prevProps, nextProps);
    if (nextProps.value !== prevProps.value) {
      this._value = nextProps.value;
    }
  }

  protected getErrorElement?(error: T["Error"]): ReactElement;

  renderError(): ReactNode {
    if (this.errorElement) return this.errorElement;

    const { error } = this;
    if (typeof error === "string") return error;

    if (error != null) return JSON.stringify(error);
  }

  componentDidMount() {
    super.componentDidMount();
    this.props.inputRef?.(this);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.props.inputRef?.(null);
  }
}

/*
WidgetElement

InputElement

 */
