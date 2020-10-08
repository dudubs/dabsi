import {
  createElement,
  Fragment,
  ReactElement,
  ReactNode,
  RefCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Awaitable, Nullable } from "../../common/typings";
import { Renderer } from "../../react/renderer";
import { WidgetElement } from "../widget/Widget";
import {
  useWidgetView,
  WidgetView,
  WidgetViewProps,
} from "../widget/WidgetView";
import {
  AnyInput,
  AnyInputConnection,
  ErrorOrValue,
  InputData,
  InputError,
  InputValueElement,
} from "./Input";
import { InputViewChildren } from "./InputViewChildren";
import set = Reflect.set;

/*

  - Form -> Input:
    - validate()
    - props.value



 */

export type _InputView<C extends AnyInputConnection> = {
  readonly value: InputValueElement<C>;
  readonly error: InputError<C> | undefined;
  readonly data: InputData<C>;

  validate(): void;

  setValue(value: InputValueElement<C>): void;

  setError(error: InputError<C> | undefined): void;
};

/*
useInputView(props)


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

export type InputViewFn<C extends AnyInputConnection> = Renderer<
  InputViewProps<C>
>;

export type InputView<C extends AnyInputConnection> = WidgetView<C> & {
  readonly data: InputData<C>;
  readonly error: InputError<C> | undefined;
  readonly errorElement: ReactElement | undefined;
  readonly value: InputValueElement<C>;
  readonly isValidating: boolean;
  readonly children?: InputViewChildren;
  setError(error: InputError<C> | undefined): void;
  setValue(value: InputValueElement<C>): Promise<void>;
  validate(): Promise<boolean>;
};

export type AnyInputView = InputView<AnyInputConnection>;
export type InputErrorOrData<
  C extends AnyInput | AnyInputConnection
> = ErrorOrValue<InputError<C>, InputData<C>>;

/*
WidgetElement

InputElement

 */

export function useInputView<C extends AnyInputConnection>(
  props: InputViewProps<C>,
  {
    validate,
    inputWillValidate,
    renderDefaultError,
    useChildren,
  }: {
    useChildren?: boolean;
    validate?: (
      value: InputValueElement<C>
    ) => Awaitable<InputError<C> | undefined>;
    renderDefaultError?: (error: InputError<C>) => ReactElement | undefined;
    inputWillValidate?: () => Awaitable;
  } = {}
): InputView<C> {
  const { element, setElement } = useWidgetView(props);

  const [count, setCount] = useState(0);

  const children = useMemo(() => {
    if (useChildren) return new InputViewChildren();
  }, [useChildren]);
  const input = useMemo((): InputView<C> => {
    let value: any = props.connection.props.getValueElementFromElement(element);
    let error: any = undefined;
    let data: any = props.connection.props.getDataFromValueElement(value);
    let errorElement: ReactElement | undefined = undefined;
    let isValidValue = false;
    let isValidating = false;
    return {
      setElement,
      children,
      get element() {
        return element;
      },
      get value() {
        return value;
      },
      get error() {
        return error;
      },
      get data() {
        return data;
      },
      get errorElement() {
        return errorElement;
      },
      get isValidating() {
        return isValidating;
      },
      async setValue(nextValue) {
        if (isValidValue && value === nextValue) return;
        isValidValue = false;
        value = nextValue;
        isValidating = true;
        update();
        setError(await validate?.(value));
        isValidating = false;
        update();
        if (error != null) {
          props.onChange?.(input);
        } else {
          props.onError?.(input);
        }
      },
      async validate() {
        await inputWillValidate?.();
        setError(children?.getError() ?? validate?.(value));
        return error == null;
      },
      setError,
    };

    function setError(nextError) {
      if (error === nextError) return;
      error = nextError;
      errorElement =
        error == null
          ? undefined
          : props.renderError?.(error) ??
            renderDefaultError?.(error) ??
            createElement(
              Fragment,
              null,
              typeof error === "string" ? error : JSON.stringify(error)
            );
      children?.updateError(error);
      update();
    }
    function update() {
      setCount(count + 1);
    }
  }, [element]);

  useEffect(() => {
    props.inputRef?.(input);
    return () => {
      props.inputRef?.(null);
    };
  });

  return input;
}
