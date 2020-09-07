import {Awaitable} from "../../common/typings";
import {FormContext} from "./FormContext";
import {AnyInput, InputType} from "../input/Input";
import {Widget} from "./Widget";

export type TForm = {
    Input: AnyInput
    Value: any
    Error: any
};


export type Form<T extends TForm> = Widget<{
    Handler: {
        submit(data: InputType<T['Input']>['Data']):
            FormSubmitResult<T>;
    }

    Connection: {

        submit(data: InputType<T['Input']>['Data']):
            Promise<FormSubmitResult<T>>;
    }
    Config: {
        input: InputType<T['Input']>['Config'],
        submit(value: InputType<T['Input']>['Value']):
            Awaitable<FormSubmitResult<T>>
    }
    Element: InputType<T['Input']>['Element']

    Controller: T['Input']

    Props: {}
    Context: {}
}>;

export type TFormArgs<Input extends AnyInput, Value, Error> = {
    Value: Value, Error: Error, Input: Input
};

export type FormSubmitResult<T extends TForm> =
    | { value: T['Value'] }
    | { error: T['Error'] }
    | { inputError: InputType<T['Input']>['Error'] };


export function Form<Value = null, Error = never>() {
    return <Input extends AnyInput>(input: Input): Form<{
        Value: Value,
        Error: Error,
        Input: Input
    }> =>
        <any>Widget<Form<TForm>>({
            controller: input,
            handler: {
                submit: async (context, data) => {
                    const result = await  input
                        .getContext(context.config.input)
                        .loadAndCheck(data);
                    if ('error' in result)
                        return {inputError: result.error}
                    return context.config.submit(result.value);
                }
            },
            connection: {
                submit(data) {
                    return this.handler(["submit", data])
                }
            },
            getContextClass: () => FormContext,

        })
}


