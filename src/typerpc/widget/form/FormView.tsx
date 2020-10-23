import { ReactElement } from "react";
import { Renderer } from "../../../react/renderer";
import { InputError, InputType } from "../../input/Input";
import { InputViewError } from "../../input/InputViewError";
import { InputView, InputViewProps } from "../../input/InputView";
import { RpcConnection } from "../../Rpc";
import { AbstractWidgetView } from "../AbstractWidgetView";
import { AnyForm, TForm } from "./Form";
import { useWidgetView } from "../useWidgetView";
import { WidgetController, WidgetElement, WidgetType } from "../Widget";
import { WidgetView, WidgetViewProps } from "../WidgetView";

export type FormViewProps<
  C extends RpcConnection<AnyForm>,
  T extends TForm = WidgetType<C>["TForm"]
> = WidgetViewProps<C> & {
  // renderFormError
  input: Renderer<InputViewProps<RpcConnection<T["Input"]>>>;

  onSubmit?(result: T["Value"]);

  onError?(result: T["Error"]);

  onInputError?(result: InputError<T["Input"]>);
};

export class FormView<
  C extends RpcConnection<AnyForm>
> extends AbstractWidgetView<
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
    if (!(await this.input.validate())) return;

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
        inputRef: field => {
          this.input = field as any;
        },
      }),
    });
  }
}

export function useFormView<C extends RpcConnection<AnyForm>>(
  props: WidgetViewProps<C>
) {
  const widget = useWidgetView(props);

  return {
    async submit() {},
  };
}
