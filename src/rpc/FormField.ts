import {Awaitable} from "../common/typings";
import {Validation, Validator} from "../validators";
import {assertValidation} from "../validators/assertValidation";
import {
    AnyRpc,
    Rpc,
    RpcConfigOf,
    RpcConnectionOf,
    RpcError,
    RpcHandler,
    RpcHandlerOf,
    RpcPayloadOf,
    RpcResultOf
} from "./Rpc";

export type FormFieldCheckResult = { type: "valid" } | { type: "invalid", reason: any };

export const loadFormField = Symbol();

type FormFieldHandler<V, D, R extends AnyRpc, E> =
    & RpcHandler<{ type: typeof loadFormField, data: D }, V>
    & RpcHandler<{ type: "getElement" }, E>
    & RpcHandler<{ type: "check", data: D }, FormFieldCheckResult>
    & RpcHandler<{ type: "remote", payload: RpcPayloadOf<R> }, RpcResultOf<R>>

    ;

type FormFieldConnection<V, D, R extends AnyRpc, E> = {
    check(data: D): Promise<FormFieldCheckResult>
    load(data: D): Promise<V>

    remote: RpcConnectionOf<R>


    getElement(): Promise<E>
};

// TODO: R extends AnyRpc
export type FormField<D, V, R extends AnyRpc, O, C, E> =
    { options: O } &
    Rpc<FormFieldHandler<V, D, R, E>,
        FormFieldConnection<D, V, R, E>,
        C>;

export type AnyFormField = FormField<any, any, any, any, any, any>;

export type AnyFormFields = Record<string, AnyFormField>;


export type FormFieldDataOf<T extends AnyFormField> =
    T extends FormField<infer U, any, any, any, any, any> ? U : never;

export type FormFieldValueOf<T extends AnyFormField> =
    T extends FormField<any, infer U, any, any, any, any> ? U : never;

export type FormFieldRemoteOf<T extends AnyFormField> =
    T extends FormField<any, any, infer U, any, any, any> ? U : never;


export type  FormFieldOptionsOf<T extends AnyFormField> =
    T extends FormField<any, any, any, infer U, any, any> ? U : never;

export type FormFieldConfigOf<T extends AnyFormField> =
    T extends FormField<any, any, any, any, infer U, any> ? U : never;

export type FormFieldElementOf<T extends AnyFormField> =
    T extends FormField<any, any, any, any, any, infer U> ? U : never;


type FormFieldProps<D, V, R extends AnyRpc, O, C, E> = {
    check?(config: C, value: V): Promise<void>;
    validate?(config: C, data: any): Validation;
    validator?: Validator<D>;
    load?(config: C, data: D): Promise<V>;
    remote: R,
    options: O,
    getRemoteConfig?(config: C): RpcConfigOf<R>

    getElement?(config: C): Awaitable<E>;
};

export function FormField<D, V, R extends AnyRpc, O, C, E>(
    props: FormFieldProps<D, V, R, O, C, E>
): FormField<D, V, R, O, C, E> {


    return {
        options: props.options,
        connect(handler: RpcHandlerOf<AnyFormField>): RpcConnectionOf<AnyFormField> {
            return {
                check(data) {
                    return handler({type: "check", data})
                },
                load(data) {
                    return handler({type: loadFormField, data})
                },
                remote: props.remote.connect(payload => {
                    return handler({type: "remote", payload})
                }),
                getElement() {
                    return handler({type: "getElement"})
                }
            }
        },
        handle(config: C): RpcHandlerOf<AnyFormField> {

            const remoteHandler = props.remote?.handle(
                props.getRemoteConfig?.(config)
            );

            handler.config = config;

            return handler

            async function load(data) {
                assertValidation(
                    props.validator?.validate(data) ??
                    props.validate?.(config, data)
                );

                const value = props.load ?
                    await props.load(config, data) :
                    data;
                await props.check?.(config, value);
                return value
            }

            async function handler(payload) {

                switch (payload.type) {
                    case loadFormField:
                        return load(payload.data);
                    case "getElement":
                        return props.getElement?.(config)

                    case "remote":
                        return remoteHandler(payload.payload);

                    case "check":
                        try {
                            await load(payload.data);

                        } catch (err) {
                            if (err instanceof FormError) {
                                return {type: "invalid", reason: err.reason}
                            }
                            throw err;
                        }
                        return {type: "valid"};
                    default:
                        throw new Error(`Invalid payload type "${payload.type}".`)
                }
            }


        }
    }


}

export class FormError extends RpcError {

}

