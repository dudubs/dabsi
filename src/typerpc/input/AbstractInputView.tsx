// TODO: AbstractInputView
import { createElement, Fragment, ReactElement, ReactNode } from "react";
import { Awaitable } from "../../common/typings";
import { ViewState } from "../../react/view/ViewState";
import { AbstractWidgetView } from "../widget/AbstractWidgetView";
import { WidgetType } from "../widget/Widget";
// TODO: type InputView
import {
  AnyInputConnection,
  InputValueData,
  InputError,
  InputType,
  InputValueElement,
} from "./Input";
import { InputView, InputViewProps } from "./InputView";
import { InputViewChildren } from "./InputViewChildren";

export abstract class AbstractInputView<
    C extends AnyInputConnection,
    P extends InputViewProps<C> = InputViewProps<C>,
    T extends InputType<C> = InputType<C>
  >
  extends AbstractWidgetView<C, P>
  implements InputView<C> {
  protected updateError?(error: T["Error"] | undefined): void;

  @ViewState("forceUpdateValue") protected _value:
    | InputValueElement<C>
    | undefined;

  @ViewState("forceUpdateError") protected _error: InputError<C>;

  @ViewState() _errorElement: ReactElement | undefined;

  @ViewState() isValidating: boolean;

  protected _data: InputValueData<C>;
  protected _isValidValue: boolean;

  children?: InputViewChildren;

  get errorElement(): ReactElement | undefined {
    return this._errorElement;
  }

  get data(): InputValueData<C> {
    return this._data;
  }

  get error(): T["Error"] | undefined {
    return this._error;
  }

  get value(): InputValueElement<C> | undefined {
    return this._value;
  }

  async setValue(value: InputValueElement<C>): Promise<void> {
    if (this._isValidValue && this._value === value) {
      return;
    }

    this._value = value;
    this.isValidating = true;
    this._error = await this.getError?.();
    this.isValidating = false;
    if (this._error != null) {
      this.props.onError?.(this);
      return;
    }
    this._isValidValue = true;
    this.props.onChange?.(this);
  }

  setError(error: T["Error"] | undefined) {
    this._error = error;
  }

  protected getError?(): Awaitable<InputError<C> | undefined>;

  protected updateValue?(value: InputValueElement<C> | undefined): void;

  protected updateElement(element: WidgetType<C>["Element"]) {
    this._value =
      this.props.value !== undefined ? this.props.value : element.value;
  }

  forceUpdateValue() {
    this._error = undefined;
    this._isValidValue = false;
    this._data = this.rpc.getValueData(this._value);
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
