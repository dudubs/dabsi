import {Awaitable} from "../../common/typings";
import {AnyInput, InputData, InputError, InputValue} from "../input/Input";
import {RpcConfig} from "../Rpc";
import {FormContext} from "./FormContext";
import {AnyWidgetOrConnection, Widget, WidgetElement, WidgetType} from "./Widget";


export type AnyForm = Form<any, any, AnyInput>;


export type FormValue<T extends AnyWidgetOrConnection<AnyForm>> =
    WidgetType<T>['FormValue'];

export type FormInput<T extends AnyWidgetOrConnection<AnyForm>> =
    WidgetType<T>['FormInput'];

export type FormError<T extends AnyWidgetOrConnection<AnyForm>> =
    WidgetType<T>['FormError'];

export type Form<Value, Error, Input extends AnyInput,
    Result = { value: Value }
        | { error: Error }
        | { inputError: InputError<Input> }> = Widget<{

    FormError: Error;
    FormValue: Value
    FormInput: Input

    Handler: {
        submit(data: InputData<Input>):
            Result;
    }

    Connection: {


        submit(data: InputData<Input>):
            Promise<Result>;
    }
    Config: {
        input: RpcConfig<Input>,

        submit(value: InputValue<Input>):
            Awaitable<Result>
    }
    Element: WidgetElement<Input>

    Controller: Input

    Props: {}
    Context: {}
}>;

export function Form<Value = null, Error = never>() {
    return <Input extends AnyInput>(input: Input): Form<Value, Error, Input> =>
        <any>Widget<AnyForm>({
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


