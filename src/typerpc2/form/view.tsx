import { AnyForm, FormInput, FormValue } from "@dabsi/typerpc2/form/rpc";
import { InputView, InputViewProps } from "@dabsi/typerpc2/input/InputView";
import { WidgetView, WidgetViewProps } from "@dabsi/typerpc2/widget/WidgetView";
import { Emittable } from "@dabsi/view/react/reactor/Reactor";
import { ReactorListener } from "@dabsi/view/react/reactor/ReactorListener";

export interface FormViewProps<T extends AnyForm> extends WidgetViewProps<T> {
  onSubmit?(value: FormValue<T>, view: FormView<T>): void;

  onInputError?(view: FormView<T>): void;

  onReset?(view: FormView<T>): void;

  children(
    inputProps: InputViewProps<T["input"]>,
    view: FormView<T>
  ): React.ReactElement;
}

export const FormViewEvent = Emittable<"submit" | "reset">();

export class FormView<T extends AnyForm> extends WidgetView<
  T,
  FormViewProps<T>
> {
  input!: InputView<FormInput<T>>;

  async submit() {
    if (!(await this.input.validate())) return;

    const result = await this.connection.submit(this.input.data);
    if ("error" in result) {
      this.input.setError(result.error);
      return;
    }
    this.props.onSubmit?.(result.value, this);
  }

  async reset() {
    this.props.onReset?.(this);
    await this.reloadElement();
  }

  renderWidget() {
    return (
      <ReactorListener
        listen={[
          FormViewEvent,
          event => {
            switch (event) {
              case "reset":
                this.reset();
                break;
              case "submit":
                this.submit();
                break;
              default:
                throw Error();
            }
          },
        ]}
      >
        {this.props.children(
          {
            parent: this,
            connection: this.connection.input,
            state: this.props.state,
            inputRef: () => {},
            element: this.element.input,
            value: this.element.value,
            onInputError: () => {},
            onInputValue: () => {},
          },
          this
        )}
      </ReactorListener>
    );
  }
}
