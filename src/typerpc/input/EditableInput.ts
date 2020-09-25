import { MetaType } from "../../common/MetaType";
import { PartialUndefinedKeys } from "../../common/typings";
import { Command } from "../Command";
import { NoRpc } from "../NoRpc";
import { RpcUndefinedConfig } from "../Rpc";
import { RpcConfigFactory } from "../RpcGenericConfig";
import { RpcMap } from "../RpcMap";
import { InlineWidget } from "../widget/InlineWidget";
import { AnyWidget, WidgetController, WidgetElement } from "../widget/Widget";
import { EditableInputContext } from "./EditableInputContext";
import {
  AnyInput,
  ErrorOrValue,
  Input,
  InputData,
  InputValueElement,
  InputError,
  InputValue,
} from "./Input";

export type EditableInput<
  EditableInput extends AnyInput,
  EditableReadonly extends AnyWidget
> = Input<{
  EditableReadonly: EditableReadonly;

  EditableInput: EditableInput;

  //
  Data: InputData<EditableInput>;

  Value: InputValue<EditableInput>;

  ValueElement: InputValueElement<EditableInput>;

  Props: {
    isDefaultReadonly: boolean;
  };

  Config:
    | RpcUndefinedConfig<EditableInput & EditableReadonly>
    | PartialUndefinedKeys<
        {
          // onEdit
          // onDoneToEdit

          getInputConfig:
            | RpcUndefinedConfig<EditableInput>
            | RpcConfigFactory<
                InputValue<EditableInput> | undefined,
                EditableInput
              >;

          getReadonlyConfig:
            | RpcUndefinedConfig<EditableReadonly>
            | RpcConfigFactory<
                InputValue<EditableInput> | undefined,
                EditableReadonly
              >;
        },
        {
          default?: InputValue<EditableInput>;
        }
      >;

  Element: {
    // TODO: input: WidgetElement<EditableInput> by use get
    data: InputData<EditableInput>;

    readonly: WidgetElement<EditableReadonly>;
  };

  Controller: RpcMap<{
    input: EditableInput;

    readonly: EditableReadonly;

    edit: Command<
      (
        data: InputData<EditableInput>
      ) => ErrorOrValue<InputError<EditableInput>, WidgetElement<EditableInput>>
    >;

    doneToEdit: Command<
      (
        data: InputData<EditableInput>
      ) => ErrorOrValue<
        InputError<EditableInput>,
        WidgetElement<EditableReadonly>
      >
    >;
  }>;

  Error: InputError<EditableInput>;
}>;

export function EditableInput<
  I extends AnyInput,
  W extends AnyWidget = InlineWidget<InputValue<I>, NoRpc>
>(input: I, widget?: W): EditableInput<I, W> {
  type T = EditableInput<AnyInput, AnyWidget>;
  return <any>Input<T>({
    props: { isDefaultReadonly: widget === undefined },
    controller: RpcMap<MetaType<WidgetController<T>>["MapItems"]>({
      input: input,
      readonly: widget ?? InlineWidget<any>()(),
      // getReadonlyElement: Command<(data: any) => any>(),
      doneToEdit: Command<(data: any) => any>(),
      edit: Command<(data: any) => any>(),
    }),
    context: EditableInputContext,
    getDataFromElement: (element) => element.data,
    getValueElementFromElement(element) {
      return this.controller.props.items.input.props.getValueElementFromElement(
        element
      );
    },
    getElementFromValueElement(element, value) {
      // TODO: remove element.data
      // TODO: add element.input

      throw new Error();
    },
  });
}

// EditableInput()

/*

EditableInput(
    TextInput(),
    TextWidget()
)
 */
