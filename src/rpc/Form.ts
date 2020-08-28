import {Awaitable} from "../common/typings";
import {AnyInput, InputType} from "./input/Input";
import {Widget} from "./Widget";

export type TForm = {
    Input: AnyInput
    Value: any
    Error: any
};

export type TFormRpc<T extends TForm> = {
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

    Static: {
        TForm?: T;
        input: T['Input']
    }
    Context: {}
};

export type Form<T extends TForm> = Widget<TFormRpc<T>>;


export type TFormArgs<Input extends AnyInput, Value, Error> = {
    Value: Value, Error: Error, Input: Input
};

export type FormSubmitResult<T extends TForm> =
    | { value: T['Value'] }
    | { error: T['Error'] }
    | { inputError: InputType<T['Input']>['Error'] };


export function Form<Value = null, Error = never>():
    <Input extends AnyInput>(input: Input) => Form<{
        Value: Value,
        Error: Error,
        Input: Input
    }> {
    return input => Widget({
        controller: input,
        static: {input},
        handlers: {
            submit: async (context, data) => {
                const result = await input
                    .getContext(context.config.input)
                    .loadAndCheck(data);
                if ('error' in result)
                    return {inputError: result.error}
                return context.config.submit(result.value);
            }
        },
        createConnection: handler => ({
            submit: data => handler(["submit", data])
        }),
        createContext: config => ({
            getControllerConfig: () => config.input,
            getElement: () => input
                .getContext(config.input)
                .getElement(),
        }),
    })
}


