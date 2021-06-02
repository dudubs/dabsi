import { Awaitable } from "@dabsi/common/typings2/Async";
import {
  AnyInput,
  InputError,
  InputValueData,
  InputValueElement,
  inputValueElementToData,
} from "@dabsi/typerpc2/input/Input";
import { WidgetView, WidgetViewProps } from "@dabsi/typerpc2/widget/WidgetView";
import { ViewState } from "@dabsi/view/react/component/decorators/ViewState";
import { updateRef } from "@dabsi/view/react/HookRef";
import React from "react";

export type InputErrorViewMap<T extends AnyInput> = {
  [K in Extract<InputError<T>, string>]?:
    | React.ReactElement
    | ((error: K) => React.ReactElement);
} &
  {
    [K in Extract<InputError<T>, { type: string }>["type"]]?:
      | React.ReactElement
      | ((error: Extract<InputError<T>, { type: K }>) => React.ReactElement);
  };

export interface InputViewProps<T extends AnyInput> extends WidgetViewProps<T> {
  onInputValue: undefined | ((view: InputView<T>) => void);

  inputRef: undefined | React.Ref<InputView<T>>;

  onInputError: undefined | ((view: InputView<T>) => void);

  value: undefined | InputValueElement<T>;

  errorMap?: InputErrorViewMap<T>;

  renderError?(error: InputError<T>): React.ReactElement;
}

export abstract class InputView<
  T extends AnyInput,
  P extends InputViewProps<T> = InputViewProps<T>
> extends WidgetView<T, P> {
  @ViewState("forceUpdateValue") private _value:
    | InputValueElement<T>
    | undefined = this.props.value;

  @ViewState("forceUpdateError") private _error!: InputError<T>;

  @ViewState() private _errorElement:
    | React.ReactElement
    | undefined = undefined;

  @ViewState() isChecking!: boolean;

  private _isValidValue: boolean = false;

  private _data!: InputValueData<T>;

  protected getError?(): Awaitable<InputError<T> | undefined>;

  protected updateValue?(value: InputValueElement<T>): void;

  protected updateError?(error: InputError<T>): void;

  protected inputWillValidate?(): Awaitable;

  protected getInputErrorViewMap?(): InputErrorViewMap<T>;

  get errorElement(): undefined | React.ReactElement {
    return this._errorElement;
  }

  get data(): InputValueData<T> {
    return this._data;
  }

  get error(): InputError<T> | undefined {
    return this._error;
  }

  get value(): InputValueElement<T> | undefined {
    return this._value;
  }

  async setValue(value: InputValueElement<T>): Promise<void> {
    if (this._isValidValue && this._value === value) {
      return;
    }
    this._value = value;
    this.isChecking = true;
    try {
      this._error = await this.getError?.();
    } finally {
      this.isChecking = false;
    }
    if (this._error != null) {
      this.props.onInputError?.(this);
      return;
    }
    this._isValidValue = true;
    this.props.onInputValue?.(this);
  }

  setError(error: InputError<T> | undefined): void {
    this._error = error;
  }

  forceUpdateValue() {
    //
    this._error = undefined;
    this._isValidValue = false;
    this._data = this.connection[inputValueElementToData](this._value);
    this.updateValue?.(this._value);
  }

  private _renderErrorElement(): React.ReactElement | undefined {
    const { _error } = this;
    if (!_error) return;
    const element = this.props.renderError?.(_error);
    if (element) return element;

    for (const getErrorMap of [
      () => this.getInputErrorViewMap?.(),
      () => this.props.errorMap,
    ]) {
      const errorMap = getErrorMap();
      if (!errorMap) continue;
      const errorType =
        typeof _error === "string"
          ? _error
          : typeof _error?.["type"] === "string"
          ? _error["type"]
          : null;

      const errorElementOrFactory = errorType && errorMap[errorType];
      if (typeof errorElementOrFactory === "function") {
        return errorElementOrFactory(_error);
      }
      return errorElementOrFactory;
    }
  }

  forceUpdateError() {
    this._errorElement =
      this.error == null ? undefined : this._renderErrorElement();
  }

  updateViewProps(prevProps: Readonly<P>, nextProps: Readonly<P>) {
    super.updateViewProps?.(prevProps, nextProps);

    if (nextProps.value !== prevProps.value) {
      this._value = nextProps.value;
    }
  }

  async validate(): Promise<void> {
    this._error = await this.inputWillValidate?.();
  }

  renderError(): React.ReactElement | undefined {
    if (this.errorElement) return this.errorElement;

    return React.createElement(
      React.Fragment,
      null,
      typeof this._error === "string"
        ? this._error
        : JSON.stringify(this._error)
    );
  }

  componentDidMount() {
    super.componentDidMount();
    updateRef(this.props.inputRef, this);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    updateRef(this.props.inputRef, null);
  }
}
