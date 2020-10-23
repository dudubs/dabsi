import {
  createElement,
  Fragment,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Awaitable } from "../../common/typings";
import { useWidgetView } from "../widget/useWidgetView";
import { AnyInputConnection, InputError, InputValueElement } from "./Input";
import { InputView, InputViewProps } from "./InputView";
import { InputViewChildren } from "./InputViewChildren";

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
    let data: any = props.connection.props.getValueData(value);
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
