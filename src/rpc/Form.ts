import {Awaitable} from "../common/typings";
import {FormContext} from "./FormContext";
import {AnyInput, InputType} from "./input/Input";
import {RpcConnection} from "./Rpc";
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
        input: RpcConnection<T['Input']>
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

    Props: {
        TForm?: T;
        input: T['Input']
    }
    Context: {}
}>;

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
        props: {input},
        handler: {
            submit: async (context, data) => {
                const result = await input
                    .getContext(context.config.input)
                    .loadAndCheck(data);
                if ('error' in result)
                    return {inputError: result.error}
                return context.config.submit(result.value);
            }
        },
        getContextClass: () => FormContext,
        createConnection: ({handler, controller}) => ({
            input: controller,
            submit: data => handler(["submit", data])
        }),

    })
}


