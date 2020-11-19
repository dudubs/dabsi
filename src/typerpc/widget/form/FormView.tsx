import React from "react";
import { ReactElement } from "react";
import { ReactorListener } from "../../../react/reactor/ReactorListener";
import { Renderer } from "../../../react/renderer";
import { InputError } from "../../input/Input";
import { InputView, InputViewProps } from "../../input/InputView";
import { RpcConnection } from "../../Rpc";
import { AbstractWidgetView } from "../AbstractWidgetView";

import { WidgetController, WidgetType } from "../Widget";
import { WidgetViewProps } from "../WidgetView";
import { AnyForm, TForm } from "./Form";

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

    const result = await this.props.connection.command(
      "submit",
      this.input.data
    );

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
    return (
      <ReactorListener
        eventType={FormViewEvent}
        onEvent={event => {
          switch (event.type) {
            case "SUBMIT":
              return this.submit();
            case "RESET":
              return this.reset();
          }
        }}
      >
        {this.props.children({
          form: this,
          input: this.props.input({
            connection: this.controller,
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

export class FormViewEvent {
  constructor(public type: "SUBMIT" | "RESET") {}
}
