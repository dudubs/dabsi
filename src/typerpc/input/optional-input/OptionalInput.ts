import { Nullable } from "../../common/typings";
import { RpcConfigOld } from "../old/Old";
import { WidgetElement } from "../widget/Widget";
import {
  AnyInput,
  Input,
  InputData,
  InputError,
  InputValue,
  InputValueElement,
} from "./Input";
import { OptionalInputContext } from "./OptionalInputContext";

export type OptionalInput<T extends AnyInput> = Input<{
  Target: T;

  Controller: T;

  Data: InputData<T> | Nullable;

  Value: InputValue<T> | Nullable;

  ValueElement: InputValueElement<T> | Nullable;

  Props: {
    target: T;
  };

  Config: RpcConfigOld<T>;

  Element: WidgetElement<T>;

  Error: InputError<T>;
}>;

/*

NullableInput(
  DataInput()
)


<NullableInputView
  ...


 */
export function OptionalInput<T extends AnyInput>(target: T): OptionalInput<T> {
  return <any>Input<OptionalInput<AnyInput>>({
    context: OptionalInputContext,
    controller: target,
    props: {
      target,
    },
    isGenericConfig: false,
    getValueData(value) {
      if (value != null) return target.props.getValueData(value);
    },
    getValueElementFromElement(element) {
      return target.props.getValueElementFromElement(element);
    },
  });
}
