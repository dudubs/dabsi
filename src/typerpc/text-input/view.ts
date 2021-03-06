// TODO: text validation in view side.
import Debounce from "@dabsi/common/async/Debounce";
import { InputValueElement } from "@dabsi/typerpc/input/Input";
import { InputView, InputViewProps } from "@dabsi/typerpc/input/InputView";
import { InputWithAnyError } from "@dabsi/typerpc/input/InputWithCustomError";
import { TextInput } from "@dabsi/typerpc/text-input/rpc";
import ViewState from "@dabsi/view/react/ViewState";

export type TextInputViewProps<T extends TextInput> = InputViewProps<T>;

export class TextInputView<
  T extends InputWithAnyError<TextInput>
> extends InputView<
  T,
  TextInputViewProps<T> & {
    children?(view: TextInputView<T>);
  }
> {
  @ViewState() protected _text!: string;

  get text(): string {
    return this._text;
  }

  protected _debounce = new Debounce(300);

  async inputWillValidate() {
    this._debounce.cancel?.();
    if (this._text !== this.value) {
      await this.setValue(this._text);
    }
  }

  updateValue(value: InputValueElement<T>) {
    super.updateValue?.(value);
    this._text = value;
  }

  async setText(text: string) {
    if (this._text === text) return;
    this._text = text;
    this.setError(undefined);

    if (!(await this._debounce.wait())) return;
    await this.setValue(text);
  }
}
