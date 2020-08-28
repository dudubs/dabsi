import {Awaitable} from "../../common/typings";
import {Renderer} from "../../react/renderer";
import {AnyInput, InputType} from "./Input";
import {ElementInput} from "./InputElement";
import {InputView, InputViewProps} from "./InputView";

export class InputElementView<E, T extends AnyInput> extends InputView<ElementInput<E, T>,
    InputViewProps<ElementInput<E, T>> & {
    target: Renderer<[E, InputViewProps<T>]>
}> {

    input: InputView<T> | null = null;

    getValidData(): Awaitable<InputType<ElementInput<E, T>>["Data"]> {
        return this.input?.getValidData();
    }

    renderView(): React.ReactNode {
        if (this.props.element) {
            const [target, element] = this.props.element;
            return this.props.target([
                target,
                {
                    connection: this.props.connection.controller,
                    element,
                    inputRef: input => {
                        this.input = input;
                    }
                }
            ]);
        }
    }

    setElement(element: InputType<ElementInput<E, T>>["Element"] | null): void {
        return this.input?.setElement(element?.[1]);
    }

    setError(error: InputType<ElementInput<E, T>>["Error"] | null): void {
        this.input?.setError(error);
    }


}
