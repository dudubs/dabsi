import {ReactNode} from "react";
import {Awaitable} from "../../common/typings";
import {Renderer} from "../../react/renderer";
import {ViewState} from "../../react/view/ViewState";
import {RpcConnection} from "../Rpc";
import {WidgetView, WidgetViewProps} from "../widget/WidgetView";
import {AnyInput, InputType, TInput} from "./Input";

export type InputViewProps<C extends RpcConnection<AnyInput>> =
    WidgetViewProps<C> & {


    onChange?(data: InputType<C>['Data']): void;

    inputRef?: (input: InputView<C> | null) => void;

    error?: InputType<C>['Error'];

    errorMap?: { [K in Extract<InputType<C>['Error'], string>]?: ReactNode }

    renderError?(error: InputType<C>['Error']): ReactNode;
};

export type InputViewRenderer<C extends RpcConnection<AnyInput>> =
    Renderer<InputViewProps<C>>;

export abstract class InputView<C extends RpcConnection<AnyInput>,
    P extends InputViewProps<C> = InputViewProps<C>,
    T extends InputType<C> = InputType<C>,
    >
    extends WidgetView<C, P> {

    abstract getValidData(): Awaitable<T['Data']>;

    protected updateError?(error: T['Error'] | undefined): void;

    @ViewState() protected _error:
        T['Error'] | undefined;

    get error(): T['Error'] | undefined {
        return this._error;
    }


    setError(error: T['Error'] | undefined) {
        this._error = error;
        this.updateError?.(error);
    }

    protected renderErrorDefault?(error: T['Error']): ReactNode;

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

        if (typeof error === "string") {

            if (this.props.errorMap && (error in this.props.errorMap)) {
                return this.props.errorMap[error]
            }
            // TODO: try to translate with "ERROR_" prefix
            return error;
        }
        return JSON.stringify({error})
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
