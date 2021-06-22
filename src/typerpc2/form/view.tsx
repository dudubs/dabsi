import { If } from "@dabsi/common/typings2/boolean";
import { AnyForm, Form, FormInput, FormValue } from "@dabsi/typerpc2/form/rpc";
import { InputView, InputViewProps } from "@dabsi/typerpc2/input/InputView";
import WidgetView, { WidgetViewProps } from "@dabsi/typerpc2/widget/WidgetView";
import ViewState from "@dabsi/view/react/ViewState";

export interface FormViewProps<T extends AnyForm> extends WidgetViewProps<T> {
  onSubmit?(value: FormValue<T>, view: FormView<T>): void;

  onSuccess?: If<
    FormValue<T>,
    { type: "success" },
    (result: Extract<FormValue<T>, { type: "success" }>) => void
  >;

  onFailed?: If<
    FormValue<T>,
    { type: "success" },
    (result: Extract<FormValue<T>, { type: "failed" }>) => void
  >;

  onInputError?(view: FormView<T>): void;

  onReset?(view: FormView<T>): void;

  children(
    inputProps: InputViewProps<T["input"]>,
    view: FormView<T>
  ): React.ReactElement;
}

export class FormView<T extends AnyForm> extends WidgetView<
  T,
  FormViewProps<T>
> {
  input!: InputView<FormInput<T>>;

  @ViewState()
  value: FormValue<T> | undefined = undefined;

  @ViewState()
  isSubmiting = false;

  async submit() {
    this.value = undefined;
    await this.input.validate();
    if (this.input.error != null) return;

    this.isSubmiting = true;
    try {
      const result = await this.connection.submit(this.input.data);
      console.log({ formResultView: result }, this.props.onSubmit);

      if ("error" in result) {
        this.input.setError(result.error);
        return;
      }

      this.props.onSubmit?.(result.value, this);

      switch (result.value?.type) {
        case "success":
          (this as FormView<any>).props.onSuccess?.(result.value as never);
          break;
        case "failed":
          (this as FormView<any>).props.onFailed?.(result.value as never);
          break;
      }
      this.value = result.value;
    } finally {
      this.isSubmiting = false;
    }
  }

  async reset() {
    this.props.onReset?.(this);
    await this.loadElement();
  }

  renderWidget() {
    return this.props.children(
      {
        parent: this,
        connection: this.connection.input,
        state: this.props.state,
        inputRef: input => (this.input = input!),
        element: this.element.input,
        value: this.element.value,
        onInputError: () => {},
        onInputValue: () => {},
      },
      this
    );
  }
}
