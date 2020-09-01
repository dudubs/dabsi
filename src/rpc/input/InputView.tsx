import {ReactNode} from "react";
import {Awaitable} from "../../common/typings";
import {Renderer} from "../../react/renderer";
import {ViewState} from "../../react/view/ViewState";
import {WidgetView, WidgetViewProps} from "../WidgetView";
import {AnyInput, InputType} from "./Input";


export type InputViewProps<T extends AnyInput> = WidgetViewProps<T> & {


    onChange?(data: InputType<T>['Data']): void;

    inputRef?: (input: InputView<T> | null) => void;

    error?: InputType<T>['Error'];


    renderError?(error: InputType<T>['Error']): ReactNode;
};

export type InputViewRenderer<T extends AnyInput> =
    Renderer<InputViewProps<T>>;

export abstract class InputView<T extends AnyInput,
    P extends InputViewProps<T> = InputViewProps<T>>
    extends WidgetView<T, P> {

    abstract getValidData(): Awaitable<InputType<T>['Data']>;

    protected updateError?(error: InputType<T>['Error'] | undefined): void;

    @ViewState() protected _error:
        InputType<T>['Error'] | undefined;

    get error(): InputType<T>['Error'] | undefined {
        return this._error;
    }


    setError(error: InputType<T>['Error'] | undefined) {
        this._error = error;
        this.updateError?.(error);
    }

    protected renderErrorDefault?(error: InputType<T>['Error']): ReactNode;

    renderError(): ReactNode {
        const error = this.error;
        if (error == null)
            return

        const element = this.props.renderError?.(error);
        if (element)
            return element;

        const baseError = this.renderErrorDefault?.(error);
        if (baseError != null)
            return baseError;

        return typeof error === "string" ? error :
            JSON.stringify({error})
    }

    reset() {
        this.updateElement?.(this.props.element);
        this.element = this.props.element;
        this.setError(null);
    }

    componentDidMount() {
        super.componentDidMount();
        this.props.inputRef?.(this);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.props.inputRef?.(null);
    }


}
