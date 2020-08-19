import {Awaitable} from "../common/typings";
import {Validation, Validator} from "../validators";
import {assertValidation} from "../validators/assertValidation";
import {
    AnyRpc,
    Rpc,
    RpcConfigType,
    RpcConnectionType,
    RpcError,
    RpcHandler,
    RpcHandlerType,
    RpcPayloadType,
    RpcResultType
} from "./Rpc";


type FormFieldHandler<T extends TAnyFormField> =
    & RpcHandler<{ type: "getElement" }, T['Element']>
    & RpcHandler<{ type: "check", data: T['Data'] }, T['Error'] | undefined>
    & RpcHandler<{ type: "remote", payload: RpcPayloadType<T['Remote']> }, RpcResultType<T['Remote']>>
    ;


type FormFieldConnection<T extends TAnyFormField> = {

    // CheckResult: { }
    check(data: T['Data']): Promise<T['Error'] | undefined>

    remote: RpcConnectionType<T['Remote']>
    getElement(): Promise<T['Element']>
};

// TODO: R extends AnyRpc

export type TAnyFormField = TFormField<any, any, AnyRpc, any, any, any, any>;

export type TFormField<Data,
    Value,
    Remote extends AnyRpc,
    Options,
    Config,
    Element, Error> = {
    Remote: Remote,
    Data: Data,
    Value: Value
    Options: Options
    Element: Element
    Config: Config
    Error: Error
};

export type FormField<T extends TAnyFormField> =
    { props: FormFieldProps2<T> } &
    Rpc<{
        Handler: FormFieldHandler<T>,
        Connection: FormFieldConnection<T>,
        Config: T['Config']
    }>;

export type FormFieldType<T extends AnyFormField> =
    T extends FormField<infer U> ? U : never;

export type AnyFormField = FormField<any>;

export type AnyFormFields = Record<string, AnyFormField>;

type FormFieldProps2<T extends TAnyFormField> = {

    // TODO: remove
    validate?(config: T['Config'], data: any): Validation;
    validator?: Validator<T['Data']>;

    check?(config: T['Config'], value: T['Value']):
        Awaitable<T['Error'] | undefined>;
    load?(config: T['Config'], data: T['Data']): Promise<T['Value']>;

    remote: T['Remote'],
    options: T['Options'],

    getRemoteConfig?(config: T['Config']): RpcConfigType<T['Remote']>
    getElement?(config: T['Config']): Awaitable<T['Element']>;
};

export function FormField<Data, Value,
    Remote extends AnyRpc,
    Options,
    Config, Element, Error>(
    props: FormFieldProps2<TFormField<Data, Value, Remote, Options, Config, Element, Error>>
): FormField<TFormField<Data, Value, Remote, Options, Config, Element, Error>> {

    type T = FormField<TFormField<Data, Value, Remote, Options, Config, Element, Error>>;

    return {
        props,
        connect(handler: RpcHandlerType<T>):
            RpcConnectionType<T> {
            return {
                check(data) {
                    return handler({type: "check", data})
                },
                remote: props.remote.connect(payload => {
                    return handler({type: "remote", payload})
                }),
                getElement() {
                    return handler({type: "getElement"})
                }
            }
        },
        handle(config): RpcHandlerType<T> {

            const remoteHandler = props.remote?.handle(
                props.getRemoteConfig?.(config)
            );
            return async (payload) => {

                switch (payload.type) {
                    case "getElement":
                        return props.getElement?.(config)

                    case "remote":
                        if (!remoteHandler)
                            throw new RpcError(`No remote`)
                        return remoteHandler(payload.payload);

                    case "check":
                        const value = await loadFormFieldValue(props, config, payload.data);
                        return checkFormFieldValue(props, config, value);
                    default:
                        throw new Error(`Invalid payload type "${payload.type}".`)
                }
            }


        }
    }


}

export class FormError extends RpcError {

}

export async function checkFormFieldValue<T extends TAnyFormField>(
    props: FormFieldProps2<T>,
    config: T['Config'],
    value: T['Value']
): Promise<T['Error'] | undefined> {
    return props.check?.(config, value)
}

export async function loadFormFieldValue<T extends TAnyFormField>(
    props: FormFieldProps2<T>,
    config: T['Config'],
    data: T['Data']
): Promise<T['Value']> {
    assertValidation(
        props.validator?.validate(data) ??
        props.validate?.(config, data)
    );

    return props.load ?
        await props.load(config, data) :
        data;
}
