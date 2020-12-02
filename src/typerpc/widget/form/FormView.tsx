import React, { ReactElement } from "react";
import { Emittable } from "../../../react/reactor/Reactor";
import { ReactorListener } from "../../../react/reactor/ReactorListener";
import { Renderer } from "../../../react/renderer";
import { InputError } from "../../input/Input";
import { InputView, InputViewProps } from "../../input/InputView";
import { RpcConnection } from "../../Rpc";
import { AbstractWidgetView } from "../AbstractWidgetView";

import { WidgetType } from "../Widget";
import { WidgetViewProps } from "../WidgetView";
import { AnyForm, TForm } from "./Form";

export type FormViewProps<
  C extends RpcConnection<AnyForm>,
  T extends TForm = WidgetType<C>["TForm"]
> = WidgetViewProps<C> & {
  // renderFormError
  input: Renderer<InputViewProps<C["input"]>>;

  onSubmit?(result: T["Value"]);

  onError?(result: T["Error"]);

  onInputError?(result: InputError<T["Input"]>);

  onError?(result: InputError<T["Input"]>);
};

export const FormViewEvent = Emittable<"submit" | "reset">();

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
  input: InputView<C["input"]>;

  reset() {
    this._element = { ...this.element };
  }

  async submit() {
    if (!(await this.input.validate())) return;

    const result = await this.connection.submit(this.input.data);

    if ("error" in result) {
      this.props.onError?.(result.error);
    } else if ("inputError" in result) {
      this.input?.setError(result.inputError);
      this.props.onInputError?.(result.inputError);
    } else {
      this.props.onSubmit?.(result.value);
    }
  }

  renderView(): React.ReactNode {
    return (
      <ReactorListener
        emittable={FormViewEvent}
        onEvent={event => {
          switch (event) {
            case "submit":
              return this.submit();
            case "reset":
              return this.reset();
          }
        }}
      >
        {this.props.children({
          form: this,
          input: this.props.input({
            connection: this.connection.input,
            value: undefined,
            onChange: undefined,
            element: this.element,
            inputRef: field => {
              this.input = field as any;
            },
            elementState: this.elementState,
            onElementStateChange: state => {
              this.setElementState(state);
            },
          }),
        })}
      </ReactorListener>
    );
  }
}
