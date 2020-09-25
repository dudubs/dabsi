import * as React from "react";
import { Awaitable } from "../../../common/typings";
import { WidgetElement } from "../../widget/Widget";
import { AnyInputConnection, InputData } from "../Input";
import { InputErrorOrData, InputView, InputViewProps } from "../InputView";

export class TestInputView<
  C extends AnyInputConnection = AnyInputConnection
> extends InputView<
  C,
  InputViewProps<C> & {
    testErrorId?: string;
    testData?:
      | InputData<C>
      | ((element: WidgetElement<C> | undefined) => InputData<C>);

    testFreezeElement?:
      | Partial<WidgetElement<C>>
      | ((element: WidgetElement<C>) => WidgetElement<C>);
    children?(view: TestInputView<C>);
  }
> {
  getValidData(): Awaitable<InputErrorOrData<C>> {
    const { testData } = this.props;
    if (typeof testData === "function")
      return {
        value: testData(this.element),
      };

    return { value: testData! };
  }

  freezeElement(): WidgetElement<C> {
    const { testFreezeElement } = this.props;
    if (typeof testFreezeElement === "function")
      return testFreezeElement(this.element);
    if (testFreezeElement) return testFreezeElement;
    return { ...this.element };
  }

  renderView(): React.ReactNode {
    return (
      <>
        {this.props.children?.(this)}

        {this.props.testErrorId && typeof this.error === "string" && (
          <>{<div id={this.props.testErrorId}>{this.error}</div>}</>
        )}
      </>
    );
  }
}
