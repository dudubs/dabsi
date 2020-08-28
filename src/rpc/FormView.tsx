import {ReactElement} from "react";
import {Awaitable} from "../common/typings";
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

        children: (props: {
            form: FormView<T['Input'], T['Value'], T['Error']>
            input: ReactElement
        }) => ReactElement
    };

export class FormView<Input extends AnyInput, Value, Error>
    extends WidgetView<Form<TFormArgs<Input, Value, Error>>,
        FormViewProps<TFormArgs<Input, Value, Error>>> {


    input: InputView<Input> | null = null;

    @ViewState() element: InputType<Input>['Element'] | null = null;

    setElement(element: WidgetType<Form<TFormArgs<Input, Value, Error>>>["Element"] | null): void {
        this.input?.setElement(element);
    }

    async reset() {
        await this.input?.setElement(this.element);
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
