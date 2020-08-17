import {entries} from "../common/object/entries";
import {isEmptyObject} from "../common/object/isEmptyObject";
import {mapObject} from "../common/object/mapObject";
import {
    AnyFormField,
    AnyFormFields,
    FormError,
    FormFieldDataOf,
    FormFieldElementOf,
    FormFieldValueOf,
    loadFormField
} from "./FormField";
import {AnyRpc, Rpc, RpcConfigOf, RpcConnectionOf, RpcHandler, RpcHandlerOf} from "./Rpc";


type FormData<F extends AnyFormFields> = { [K in keyof F]: FormFieldDataOf<F[K]> };
type FormElement<F extends AnyFormFields> = { [K in keyof F]: FormFieldElementOf<F[K]> };
type FormValue<F extends AnyFormFields> = { [K in keyof F]: FormFieldValueOf<F[K]> };

type FormCheckResult =
    { type: "valid" }
    | { type: "invalid", reasons: Record<string, any> };

type FormSubmitResult<R> =
    { type: "invalid", reasons: Record<string, any> }
    | { type: "fail", reason: any }
    | { type: "success", value: R };

export type AnyForm = Form<any, any>;

export type FormFieldsOf<T extends AnyForm> =
    T extends Form<infer U, any> ? U : never;

export type FormResultOf<T extends AnyForm> =
    T extends Form<any, infer U> ? U : never;

export type Form<F extends AnyFormFields, R> =
    { fields: F } &
    Rpc<//

        & RpcHandler<{ type: "check", data: FormData<F> }, FormCheckResult>
        & RpcHandler<{ type: "getElement" }, FormElement<F>>
        & RpcHandler<{ type: "remote", name: string, payload: any }, any>
        & RpcHandler<{ type: "submit", data: FormData<F> }, FormSubmitResult<R>>,
        {

            // default(): FormData
            fields: { [K in keyof F]: RpcConnectionOf<F[K]> }

            submit(data: FormData<F>): Promise<FormSubmitResult<R>>;
            check(data: FormData<F>): Promise<FormCheckResult>


            getElement(): Promise<FormElement<F>>;
        }, {

        fields: { [K in keyof F]: RpcConfigOf<F[K]> }


        submit?(value: FormValue<F>): Promise<R>;


    }>;


export function Form<R = any>():
    <F extends AnyFormFields> (fields: F) => Form<F, R> {
    return <any>((fields: Record<string, AnyFormField>): AnyForm => {
        return {
            fields,
            connect(handler: RpcHandlerOf<Form<any, any>>): RpcConnectionOf<Form<any, any>> {
                return {
                    fields: <any>mapObject(fields, (field: AnyRpc, name: string): any => {
                        return field.connect(async payload => {
                            return handler({type: "remote", name, payload})
                        })
                    }),
                    submit(data) {
                        return handler({type: "submit", data});
                    },
                    check(data) {
                        return handler({type: "check", data});
                    },
                    getElement() {
                        return handler({type: "getElement"})
                    }
                }
            },
            handle(config: RpcConfigOf<Form<any, any>>): RpcHandlerOf<Form<any, any>> {

                const fieldNameToHandler:
                    Record<string, RpcHandlerOf<AnyFormField>> = mapObject(fields, (field, name) => {
                    return field.handle(config.fields[name])
                });


                return async payload => {
                    switch (payload.type) {
                        case "getElement": {
                            const element = {};
                            for (const [name, handler] of entries(fieldNameToHandler)) {
                                element[name] = await handler({type: "getElement"});
                            }
                            return element;
                        }

                        case "remote":
                            return fieldNameToHandler[payload.name](payload.payload);

                        case "check": {
                            const reasons = {};
                            for (const [name, handler] of entries(fieldNameToHandler)) {
                                const result = await handler({type: "check", data: payload.data[name]});
                                if (result.type == "invalid") {
                                    reasons[name] = result.reason;
                                }
                            }
                            if (!isEmptyObject(reasons))
                                return {type: "valid"}
                            return {type: "invalid", reasons}
                        }
                        case "submit": {
                            const values = {};
                            const reasons = {};

                            for (const [name, handler] of entries(fieldNameToHandler)) {
                                let value;
                                try {
                                    value = await handler({type: loadFormField, data: payload.data[name]});
                                } catch (error) {
                                    if (error instanceof FormError) {
                                        reasons[name] = error.reason;
                                        continue;
                                    }
                                    throw new Error()
                                }
                                values[name] = value;
                            }

                            if (!isEmptyObject(reasons)) {
                                return {type: "invalid", reasons}
                            }

                            let value;
                            try {
                                value = await config.submit?.(values);
                            } catch (error) {
                                if (error instanceof FormError) {
                                    return {type: "fail", reason: error.reason}
                                }
                                throw error;
                            }
                            return {type: "success", value}
                        }
                        default:
                            throw new Error(`Invalid payload type "${payload.type}".`)
                    }
                }
            }
        }
    })
}

