import {Awaitable, NonNullableAt} from "../../common/typings";
import {Renderer} from "../../react/renderer";
import {EmptyFragment} from "../../react/utils/EmptyFragment";
import {RpcConnection} from "../Rpc";
import {ElementInput} from "./ElementInput";
import {AnyInput, InputType} from "./Input";
import {InputView, InputViewProps} from "./InputView";

export class ElementInputView<C extends RpcConnection<ElementInput<any, AnyInput>>>
    extends InputView<C,
        InputViewProps<C> & {
        target: Renderer<[
            InputType<C>['SubElement'],
            InputViewProps<RpcConnection<InputType<C>['SubInput']>>
        ]>
    }> {

    target: InputView<C['controller']> | null;

    getValidData(): Awaitable<InputType<C>["Data"]> {
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


    protected updateError(error: InputType<C>["Error"] | undefined): void {
        this.target?.setError(error);
    }


}
