import {ReactElement} from "react";
import {NonNullableAt} from "../../common/typings";
import {Renderer} from "../../react/renderer";
import {InputError} from "../input/InputError";
import {InputView, InputViewProps} from "../input/InputView";
import {RpcConnection} from "../Rpc";
import {AnyForm, Form, TForm} from "./Form";
import {WidgetView, WidgetViewProps} from "./WidgetView";

export type FormViewProps<C extends RpcConnection<Form<TForm>>,
    T extends NonNullableAt<C, 'TForm'> = NonNullableAt<C, 'TForm'>> =
    WidgetViewProps<C> &
    {

        input: Renderer<InputViewProps<C['controller']>>

        onSubmit?(result: T['Value']);

        onError?(result: T['Error']);

        onInputError?(result: T['Input']['Error']);

    };

export class FormView<C extends RpcConnection<AnyForm>>
    extends WidgetView<C,
        FormViewProps<C>
        & {
        children: (props: {
            form: FormView<C>
            input: ReactElement
        }) => ReactElement
    }> {


    input: InputView<C['controller']> | null = null;


    reset() {
        this.input?.reset();
    }

    async submit() {
        let data;
        try {
            data = await this.input?.getValidData();
        } catch (error) {
            if (error instanceof InputError) {
                return;
            }
            throw error;
        }
        const result = await this.props.connection.submit(data);
        if ('inputError' in result) {
            this.input?.setError(result.inputError);
            this.props.onInputError?.(result.inputError);
        } else if ('error' in result) {
            this.props.onError?.(result.error);
        } else {
            this.props.onSubmit?.(result.value);
        }

    }

    renderView(): React.ReactNode {
        return this.props.children({
            form: this,
            input: this.props.input({
                connection: this.props.connection.controller,
                element: this.element,
                inputRef: field => {
                    this.input = field as any;
                }
            })
        })
    }
}
