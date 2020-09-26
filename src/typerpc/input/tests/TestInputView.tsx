import * as React from "react";
import { Awaitable } from "../../../common/typings";
import { WidgetElement } from "../../widget/Widget";
import { AnyInputConnection, InputData, InputError } from "../Input";
import { InputView, InputViewProps } from "../InputView";

export class TestInputView<
  C extends AnyInputConnection = AnyInputConnection
> extends InputView<
  C,
  InputViewProps<C> & {
    testId?: string;
    testData?:
      | InputData<C>
      | ((element: WidgetElement<C> | undefined) => InputData<C>);
    //
    // testFreezeElement?:
    //   | Partial<WidgetElement<C>>
    //   | ((element: WidgetElement<C>) => WidgetElement<C>);
    children?(view: TestInputView<C>);
  }
> {
  async getCheckedData(): Promise<[false] | [true, InputData<C>]> {
    return [
      true,
      typeof this.props.testData === "function"
        ? this.props.testData(this.element)
        : this.props.testData,
    ];
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
