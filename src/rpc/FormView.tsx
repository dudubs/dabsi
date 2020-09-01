import {ReactElement} from "react";
import {Renderer} from "../react/renderer";
import {ViewState} from "../react/view/ViewState";
import {Form, TForm, TFormArgs} from "./Form";
import {AnyInput, InputType} from "./input/Input";
import {InputError} from "./input/InputError";
import {InputView, InputViewProps} from "./input/InputView";
import {WidgetType} from "./Widget";
import {WidgetView, WidgetViewProps} from "./WidgetView";

export type FormViewProps<T extends TForm> =
    WidgetViewProps<Form<T>> &
    {

        input: Renderer<InputViewProps<T['Input']>>

        onSubmit?(result: T['Value']);

        onError?(result: T['Error']);

        onInputError?(result: InputType<T['Input']>['Error']);

    };

export class FormView<Input extends AnyInput, Value, Error>
    extends WidgetView<Form<TFormArgs<Input, Value, Error>>,
        FormViewProps<TFormArgs<Input, Value, Error>> & {
        children: (props: {
            form: FormView<Input, Value, Error>
            input: ReactElement
        }) => ReactElement
    }> {


    input: InputView<Input> | null = null;

    @ViewState() element: InputType<Input>["Element"] | undefined = null;

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
                connection: this.props.connection.input,
                element: this.element,
                inputRef: field => {
                    this.input = field as any;
                }
            })
        })
    }
}
