import {Awaitable} from "../../common/typings";
import {RpcConnection} from "../Rpc";
import {FormContext} from "./FormContext";
import {AnyInput, Input, InputType, TInput} from "../input/Input";
import {Widget} from "./Widget";

// TODO: Don't use type map
export type TForm = {
    Input: TInput
    Value: any
    Error: any
};

export type AnyForm = Form<TForm>;


export type Form<T extends TForm> = { TForm?: T } & Widget<{
    Handler: {
        submit(data: T['Input']['Data']):
            FormSubmitResult<T>;
    }

    Connection: {

        TForm?:T;

        submit(data: T['Input']['Data']):
            Promise<FormSubmitResult<T>>;
    }
    Config: {
        input: T['Input']['Config'],
        submit(value: T['Input']['Value']):
            Awaitable<FormSubmitResult<T>>
    }
    Element: T['Input']['Element']

    Controller: Input<T['Input']>

    Props: {}
    Context: {}
}>;

export type TFormArgs<Input extends TInput, Value, Error> = {
    Value: Value, Error: Error, Input: Input
};

export type FormSubmitResult<T extends TForm> =
    | { value: T['Value'] }
    | { error: T['Error'] }
    | { inputError: T['Input']['Error'] };


export function Form<Value = null, Error = never>() {
    return <Input extends AnyInput>(input: Input): Form<{
        Value: Value,
        Error: Error,
        Input: InputType<Input>
    }> =>
        <any>Widget<Form<TForm>>({
            controller: input,
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
            connection: {
                submit(data) {
                    return this.handler(["submit", data])
                }
            },
            context: FormContext,

        })
}


