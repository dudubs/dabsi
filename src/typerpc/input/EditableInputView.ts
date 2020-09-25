import { Awaitable } from "../../common/typings";
import { Renderer } from "../../react/renderer";
import { ViewState } from "../../react/view/ViewState";
import { RpcConnection } from "../Rpc";
import { AnyWidget, WidgetElement } from "../widget/Widget";
import { WidgetViewProps } from "../widget/WidgetView";
import { EditableInput } from "./EditableInput";
import { AnyInput, InputType } from "./Input";
import { InputErrorOrData, InputView, InputViewProps } from "./InputView";

export type AnyEditableInputConnection = RpcConnection<
  EditableInput<AnyInput, AnyWidget>
>;

export class EditableInputView<
  C extends AnyEditableInputConnection
> extends InputView<
  C,
  InputViewProps<C> & {
    children: Renderer<{
      view: Readonly<EditableInputView<C>>;
      readonlyProps: WidgetViewProps<
        RpcConnection<InputType<C>["EditableReadonly"]>
      >;
      inputProps:
        | InputViewProps<RpcConnection<InputType<C>["EditableInput"]>>
        | undefined;
    }>;
  }
> {
  input?: InputView<RpcConnection<InputType<C>["EditableInput"]>>;

  @ViewState() inputElement?: WidgetElement<InputType<C>["EditableInput"]>;

  freezeElement(): WidgetElement<C> {
    return { ...this.element };
  }

  async edit(): Promise<boolean> {
    const result = await this.controller.edit(this.element?.data);
    if ("error" in result) {
      this.setError(result.error);
      return false;
    } else {
      this.inputElement = result.value;
      return true;
    }
  }

  setError(error: InputType<C>["Error"] | undefined) {
    super.setError(error);
    this.input?.setError(error);
  }

  cancelEdit() {
    this.inputElement = undefined;
  }
  async doneToEdit(): Promise<boolean> {
    const dataResult = await this.input!.getValidData();
    if ("error" in dataResult) return false;
    const result = await this.controller.doneToEdit(dataResult.value);
    if ("error" in result) {
      this.input!.setError(result.error);
      return false;
    } else {
      this.inputElement = undefined;
      this.element = {
        ...this.element,
        data: dataResult.value,
        readonly: result.value,
      };
      this.props.onChange?.(this);
      return true;
    }
  }

  getValidData(): Awaitable<InputErrorOrData<C>> {
    if (this.input) return this.input.getValidData();
    if (this.error) return { error: this.error, value: this.element?.data };
    return { value: this.element?.data };
  }

  renderView(): React.ReactNode {
    return this.props.children({
      view: this,
      readonlyProps: {
        key: "widget",
        element: this.element.readonly,
        connection: this.controller.readonly,
      },
      inputProps: this.inputElement && {
        onChange: undefined,
        key: "widget",
        element: this.inputElement,
        connection: this.controller.input,
        inputRef: (input) => {
          this.input = input;
          if (input && this.error) {
            input.setError(this.error);
          }
        },
      },
    });
  }
}
