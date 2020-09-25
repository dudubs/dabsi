import {
  createElement,
  Fragment,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Awaitable } from "../../common/typings";
import { Renderer } from "../../react/renderer";
import { ViewState } from "../../react/view/ViewState";
import { RpcConnection } from "../Rpc";
import { WidgetElement, WidgetType } from "../widget/Widget";
import { WidgetView, WidgetViewProps } from "../widget/WidgetView";
import {
  AnyInput,
  AnyInputConnection,
  ErrorOrValue,
  InputData,
  InputValueElement,
  InputError,
  InputType,
} from "./Input";

export type InputErrorViewProps<C extends AnyInputConnection> = {
  error?: InputError<C>;

  errorMap?: { [K in Extract<InputError<C>, string>]?: ReactNode /* Or Fn*/ };
};

export type InputViewProps<C extends AnyInputConnection> = WidgetViewProps<C> &
  InputErrorViewProps<C> & {
    onChange?: (view: InputView<C>) => void;

    inputRef?: (input: InputView<C> | undefined) => void;

    renderError?(error: InputError<C>): ReactElement;
  };

export type InputViewRenderer<C extends AnyInputConnection> = Renderer<
  InputViewProps<C>
>;

export type InputErrorOrData<
  C extends AnyInput | AnyInputConnection
> = ErrorOrValue<InputError<C>, InputData<C>>;

export abstract class InputView<
  C extends AnyInputConnection,
  P extends InputViewProps<C> = InputViewProps<C>,
  T extends InputType<C> = InputType<C>
> extends WidgetView<C, P> {
  protected updateError?(error: T["Error"] | undefined): void;

  abstract getValidData(): Awaitable<InputErrorOrData<C>>;

  @ViewState() protected _error: T["Error"] | undefined;

  @ViewState() errorElement: ReactElement | undefined;

  abstract freezeElement(): WidgetElement<C>;

  protected _hasValue = false;
  protected _value?: InputValueElement<C>;

  checkValue?(value: InputValueElement<C>): Awaitable<InputError<C>>;

  async getCheckedValue() {
    const error = this.checkValue?.(this.value);
  }

  get value(): InputValueElement<C> {
    if (this._hasValue) return this._value;
    this._value = this.props.connection.props.getValueElementFromElement(
      this.element
    );
    this._hasValue = true;
    return this._value;
  }

  setValue2(value: InputValueElement<C>) {
    this._value = value;
    this._hasValue = true;
    this.element = this.props.connection.props.getElementFromValueElement(
      this.element,
      value
    );
    this.props.onChange?.(this);
  }

  protected updateElement(element: WidgetType<C>["Element"]) {
    this._hasValue = false;
  }

  get error(): T["Error"] | undefined {
    return this._error;
  }

  setError(error: T["Error"] | undefined) {
    this._error = error;
    this.errorElement = this.renderErrorToElement(error);

    this.updateError?.(error);
  }

  protected renderErrorDefault?(error: T["Error"]): ReactElement;

  renderErrorToElement(error: T["Error"]): ReactElement | undefined {
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

    if (typeof this.error === "string") return this.error;

    if (this.error != null) return JSON.stringify(this.error);
  }

  reset() {
    this.updateElement?.(this.props.element);
    this.element = this.props.element;
    this.setError(null);
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
type UsedInput<C extends AnyInputConnection> = {
  props: InputViewProps<C>;
  readonly default: InputValueElement<C>;
};

export function useInputDefault<
  C extends AnyInputConnection,
  P extends InputViewProps<C>
>(props: P): [InputValueElement<C>, P] {
  const [element, setElement] = useState<InputValueElement<C>>(() =>
    props.connection.props.getValueElementFromElement(props.element)
  );

  useEffect(() => {
    props.connection.props.getValueElementFromElement(props.element);
  }, [props.element]);

  return [
    element,
    {
      ...props,
      onChange: (view) => {
        props.onChange?.(view);
        setElement(
          props.connection.props.getValueElementFromElement(
            view.freezeElement()
          )
        );
      },
    },
  ];
}
