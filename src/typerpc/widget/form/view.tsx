import { Debounce2 } from "@dabsi/common/async/Debounce";
import { Tick } from "@dabsi/common/async/Tick";
import {
  InputError,
  InputValue,
  InputValueElement,
} from "@dabsi/old-typerpc/input/Input";
import {
  InputView,
  InputViewInstance,
  InputViewProps,
} from "@dabsi/old-typerpc/input/InputView";
import { RpcConnection } from "@dabsi/old-typerpc/Rpc";
import { AnyForm, TForm } from "@dabsi/old-typerpc/widget/form/rpc";
import {
  WidgetView,
  WidgetViewProps,
} from "@dabsi/old-typerpc/widget/view/component";
import { WidgetElement, WidgetType } from "@dabsi/old-typerpc/widget/Widget";
import { BaseProps } from "@dabsi/view/react/BaseProps";
import { Emittable } from "@dabsi/view/react/reactor/Reactor";
import { ReactorListener } from "@dabsi/view/react/reactor/ReactorListener";
import React from "react";

export type FormViewProps<
  C extends RpcConnection<AnyForm>,
  T extends TForm = WidgetType<C>["TForm"]
> = WidgetViewProps<C> & {
  onSubmit?(result: T["Value"], view: FormView<C>);

  onError?(result: T["Error"]);

  onInputError?(result: InputError<T["Input"]>);

  onError?(result: InputError<T["Input"]>);

  children(
    inputProps: InputViewProps<C["input"]>,
    view: FormView<C>
  ): React.ReactElement;

  onInputValue?(
    value: InputValueElement<C["input"]>,
    reason: "change" | "update"
  ): void;
};

export const FormViewProps = BaseProps<FormViewProps<any>>({
  ...WidgetViewProps.map,
  onSubmit: true,
  onError: true,
  onInputError: true,

  children: true,
  onInputValue: true,
});

export const FormViewEvent = Emittable<"submit" | "reset">();

export class FormView<C extends RpcConnection<AnyForm>> extends WidgetView<
  C,
  FormViewProps<C>
> {
  input!: InputViewInstance<C["input"]>;

  reset() {
    this._element = { ...this.element };
  }

  updateElement(element: WidgetElement<C>) {
    super.updateElement?.(element);
    Tick().then(() => {
      this.props.onInputValue?.(element.value, "update");
    });
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
      this.props.onSubmit?.(result.value, this);
    }
  }

  renderView(): React.ReactNode {
    return (
      <ReactorListener
        listen={[
          FormViewEvent,
          event => {
            switch (event) {
              case "submit":
                return this.submit();
              case "reset":
                return this.reset();
            }
          },
        ]}
      >
        {this.props.children(
          {
            connection: this.connection.input,
            value: undefined,
            onChange: view => {
              this.props.onInputValue?.(view.value, "change");
            },
            element: this.element,
            inputRef: field => {
              this.input = field as any;
            },
            elementState: this.elementState,
            onElementStateChange: state => {
              this.setElementState(state);
            },
          },
          this
        )}
      </ReactorListener>
    );
  }
}
