import { ReactElement } from "react";
import { Renderer } from "../../react/renderer";
import { InputError, InputType } from "../input/Input";
import { InputViewError } from "../input/InputViewError";
import { InputView, InputViewProps } from "../input/InputView";
import { RpcConnection } from "../Rpc";
import { AnyForm } from "./Form";
import { WidgetController, WidgetElement, WidgetType } from "./Widget";
import { WidgetView, WidgetViewProps } from "./WidgetView";

export type FormViewProps<
  C extends RpcConnection<AnyForm>,
  T extends WidgetType<C> = WidgetType<C>
> = WidgetViewProps<C> & {
  // renderFormError
  input: Renderer<InputViewProps<RpcConnection<T["FormInput"]>>>;

  onSubmit?(result: T["FormValue"]);

  onError?(result: T["FormError"]);

  onInputError?(result: InputError<T["FormInput"]>);
};

export class FormView<C extends RpcConnection<AnyForm>> extends WidgetView<
  C,
  FormViewProps<C> & {
    children: (props: {
      form: FormView<C>;
      input: ReactElement;
    }) => ReactElement;
  }
> {
  input: InputView<RpcConnection<WidgetController<C>>>;

  reset() {
    this._element = { ...this.element };
  }

  async submit() {
    await this.input.validate();
    if (this.input.error !== null) return;

    const result = await this.props.connection.submit(this.input.data);
    if ("inputError" in result) {
      this.input?.setError(result.inputError);
      this.props.onInputError?.(result.inputError);
    } else if ("error" in result) {
      this.props.onError?.(result.error);
    } else {
      this.props.onSubmit?.(result.value);
    }
  }

  renderView(): React.ReactNode {
    return this.props.children({
      form: this,
      input: this.props.input({
        connection: this.controller,
        onChange: undefined,
        element: this.element,
        inputRef: (field) => {
          this.input = field as any;
        },
      }),
    });
  }
}
