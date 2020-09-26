import { Awaitable } from "../../common/typings";
import { EmptyFragment } from "../../react/utils/EmptyFragment";
import { WidgetElement } from "../widget/Widget";
import { AnyInputConnection, InputError, InputType } from "./Input";
import { InputErrorOrData, InputView } from "./InputView";
import { InputViewError } from "./InputViewError";

export class NoInputView<C extends AnyInputConnection> extends InputView<C> {
  renderView(): React.ReactNode {
    if (this.error) throw new InputViewError(this.error);
    return EmptyFragment;
  }

  protected getError(): Awaitable<InputError<C> | undefined> {
    return undefined;
  }
}
