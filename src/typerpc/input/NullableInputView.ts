import { Awaitable } from "../../common/typings";
import { Renderer } from "../../react/renderer";
import { RpcConnection } from "../Rpc";
import { AnyInput, InputType, InputValueElement } from "./Input";
import { AnyInputView, InputView, InputViewProps } from "./InputView";
import { OptionalInput } from "./OptionalInput";

export class NullableInputView<
  C extends RpcConnection<OptionalInput<AnyInput>>
> extends InputView<
  C,
  InputViewProps<C> & {
    target: Renderer<InputViewProps<RpcConnection<InputType<C>["Target"]>>>;
    children?: Renderer<NullableInputView<C>>;
  }
> {
  target: AnyInputView | null;

  inputWillValidate(): Awaitable {
    if (this.value != null) {
      return this.target?.validate();
    }
  }

  protected updateError(error: InputType<C>["Error"] | undefined) {
    this.target?.setError(error);
  }

  protected updateValue(value: InputValueElement<C>) {
    if (value === null) {
      this.target?.setError(undefined);
    }
  }

  renderTarget() {
    return this.props.target({
      connection: this.connection.controller,
      element: this.element,
      value: this.value != null ? this.value : undefined,
      onChange: (view) => this.setValue(view.value),
      onError: () => {
        this.props.onError?.(this);
      },
      inputRef: (target) => {
        this.target = target;
      },
    });
  }

  renderView(): React.ReactNode {
    if (this.props.children) return this.props.children(this);
    return this.renderTarget();
  }
}
