import { AnyForm, FormInput, FormValue } from "@dabsi/typerpc2/form/rpc";
import { InputView } from "@dabsi/typerpc2/input/InputView";
import { WidgetView, WidgetViewProps } from "@dabsi/typerpc2/widget/WidgetView";
import { Emittable } from "@dabsi/view/react/reactor/Reactor";
import { ReactorListener } from "@dabsi/view/react/reactor/ReactorListener";

export interface FormViewProps<T extends AnyForm> extends WidgetViewProps<T> {
  onSubmit?(value: FormValue<T>, view: FormView<T>): void;

  onInputError?(view: FormView<T>): void;

  onReset?(view: FormView<T>): void;

  children(view: FormView<T>): React.ReactElement;
}

export const FormViewEvent = Emittable<"submit" | "reset">();

export class FormView<T extends AnyForm> extends WidgetView<
  T,
  FormViewProps<T>
> {
  input!: InputView<FormInput<T>>;

  async sumbit() {
    if (!(await this.input.validate())) return;

    const result = await this.widget.submit(this.input.data);
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
                this.sumbit();
                break;
              default:
                throw Error();
            }
          },
        ]}
      >
        {this.props.children(this)}
      </ReactorListener>
    );
  }
}
