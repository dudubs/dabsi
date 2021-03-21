import { Awaitable } from "@dabsi/common/typings2/Async";
import { Renderer } from "@dabsi/view/react/renderer";
import { ViewState } from "@dabsi/view/react/component/decorators/ViewState";
import {
  AnyInput,
  AnyInputConnection,
  BasedInput,
  ErrorOrValue,
  InputError,
  InputType,
  InputValueData,
  InputValueElement,
} from "@dabsi/typerpc/input/Input";
import { InputViewChildren } from "@dabsi/typerpc/input/InputViewChildren";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { WidgetType } from "@dabsi/typerpc/widget/Widget";
import {
  WidgetView,
  WidgetViewProps,
} from "@dabsi/typerpc/widget/view/component";
import {
  createElement,
  Fragment,
  ReactElement,
  ReactNode,
  RefCallback,
} from "react";

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

  onChange?: (view: InputViewInstance<C>) => void;

  inputRef?: RefCallback<InputViewInstance<C>>;

  renderError?(error: InputError<C>): ReactElement;

  onError?(view: InputViewInstance<C>): void;

  value?: InputValueElement<C> | undefined;
}

export type InputViewFn<C extends AnyInput> = Renderer<
  InputViewProps<RpcConnection<C>>
>;

export interface InputViewInstance<C extends AnyInputConnection>
  extends WidgetView<C> {
  readonly data: InputValueData<C>;
  readonly error: InputError<C> | undefined;
  readonly errorElement: ReactElement | undefined;
  readonly value: InputValueElement<C> | undefined;
  readonly isValidating: boolean;
  readonly children?: InputViewChildren;
  setError(error: InputError<C> | undefined): void;
  setValue(value: InputValueElement<C>): Promise<void>;
  validate(): Promise<boolean>;
}

export abstract class AbstractInputView<
    C extends AnyInputConnection,
    P extends InputViewProps<C> = InputViewProps<C>,
    T extends InputType<C> = InputType<C>
  >
  extends WidgetView<C, P>
  implements InputViewInstance<C> {
  protected updateError?(error: T["Error"] | undefined): void;

  @ViewState("forceUpdateValue") protected _value:
    | InputValueElement<C>
    | undefined;

  @ViewState("forceUpdateError") protected _error!: InputError<C>;

  @ViewState() _errorElement!: ReactElement | undefined;

  @ViewState() isValidating!: boolean;

  protected _data!: InputValueData<C>;
  protected _isValidValue!: boolean;

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
    this._data = this.connection.$widget.getValueDataFromValueElement(
      this._value
    );

    this.updateValue?.(this._value);
  }

  // TODO: ["children", { ... }]
  protected renderErrorElement(): ReactElement | undefined {
    const { error } = this;
    // TODO: use this.error
    if (error == null) return;
    const element = this.props.renderError?.(error);
    if (element) return element;

    const errorMap: Record<string, ReactElement | ((error) => ReactElement)> = {
      ...this.getErrorElementMap?.()!,
      ...this.props.errorMap!,
    } as any;

    const errorType =
      typeof error === "string"
        ? error
        : typeof error === "object" && typeof error.type === "string"
        ? error.type
        : undefined;

    const errorElementOrFn = errorMap[errorType];

    if (typeof errorElementOrFn === "function")
      return createElement(
        Fragment,
        null,
        errorElementOrFn(typeof error === "object" ? error : undefined)
      );

    if (errorElementOrFn) return errorElementOrFn;
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

  protected getErrorElementMap?(): InputErrorElementMap<C>;

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

export type InputViewClass<T extends AnyInput> = new (
  props: InputViewProps<RpcConnection<T>>
) => InputViewInstance<RpcConnection<T>>;

export type AnyInputView = InputView<AnyInputConnection>;

export type InputErrorOrData<
  C extends AnyInput | AnyInputConnection
> = ErrorOrValue<InputError<C>, InputValueData<C>>;

export class InputView<C extends AnyInputConnection> extends AbstractInputView<
  C,
  InputViewProps<C> & {
    render?(view: InputView<C>): ReactNode;
    beforeValidate?(view: InputView<C>);
    updateError?(view: InputView<C>);
  }
> {
  inputWillValidate() {
    this.props.beforeValidate?.(this);
  }

  updateError() {
    this.props.updateError?.(this);
  }

  renderView() {
    return this.props.render?.(this);
  }
}
