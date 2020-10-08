import * as React from "react";
import { Awaitable } from "../../../common/typings";
import { WidgetElement } from "../../widget/Widget";
import { AbstractInputView } from "../AbstractInputView";
import {
  AnyInputConnection,
  InputData,
  InputError,
  InputValue,
} from "../Input";
import { InputView, InputViewProps } from "../InputView";

export class TestInputView<
  C extends AnyInputConnection = AnyInputConnection
> extends AbstractInputView<
  C,
  InputViewProps<C> & {
    testId?: string;
    testValue?:
      | InputValue<C>
      | ((element: WidgetElement<C> | undefined) => InputValue<C>);
    //
    // testFreezeElement?:
    //   | Partial<WidgetElement<C>>
    //   | ((element: WidgetElement<C>) => WidgetElement<C>);
    children?(view: TestInputView<C>);
  }
> {
  async validate(): Promise<boolean> {
    if (this.props.testValue !== undefined) {
      await this.setValue(
        typeof this.props.testValue === "function"
          ? this.props.testValue(this.element)
          : this.props.testValue
      );
    }
    return super.validate();
  }

  renderView(): React.ReactNode {
    const testIdPrefix = this.props.testId ? this.props.testId + ":" : "";
    return (
      <>
        {this.props.children?.(this)}
        <div id={testIdPrefix + "error"}>{this.errorElement}</div>
      </>
    );
  }

  protected getError(): Awaitable<InputError<C> | undefined> {
    return this.error;
  }
}
