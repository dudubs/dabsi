import {Awaitable} from "../../common/typings";
import {Renderer} from "../../react/renderer";
import {EmptyFragment} from "../../react/utils/EmptyFragment";
import {ElementInput} from "./ElementInput";
import {AnyInput, InputType} from "./Input";
import {InputView, InputViewProps} from "./InputView";

export class ElementInputView<E, T extends AnyInput>
    extends InputView<ElementInput<E, T>,
        InputViewProps<ElementInput<E, T>> & {
        target: Renderer<[E, InputViewProps<T>]>
    }> {

    target: InputView<T> | null;

    getValidData(): Awaitable<InputType<ElementInput<E, T>>["Data"]> {
        return this.target?.getValidData();
    }

    renderView(): React.ReactNode {
        if (!this.element)
            return EmptyFragment
        const [target, element] = this.element;
        return this.props.target([
            target,
            {
                connection: this.props.connection.controller,
                element,
                inputRef: input => {
                    this.target = input;
                }
            }
        ]);
    }


    protected updateError(error: InputType<ElementInput<E, T>>["Error"] | undefined): void {
        this.target?.setError(error);
    }


}
