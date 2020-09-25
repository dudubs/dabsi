import { Awaitable } from "../../common/typings";
import { EmptyFragment } from "../../react/utils/EmptyFragment";
import { WidgetElement } from "../widget/Widget";
import { AnyInputConnection, InputType } from "./Input";
import { InputErrorOrData, InputView } from "./InputView";
import { InputViewError } from "./InputViewError";

export class NoInputView<C extends AnyInputConnection> extends InputView<C> {
  renderView(): React.ReactNode {
    if (this.error) throw new InputViewError(this.error);
    return EmptyFragment;
  }

  freezeElement(): WidgetElement<C> {
    return { ...this.element };
  }

  getValidData(): Awaitable<InputErrorOrData<C>> {
    return this.props.connection.props.getDataFromElement(this.element);
  }
}
