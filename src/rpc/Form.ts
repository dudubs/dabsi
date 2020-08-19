import {entries} from "../common/object/entries";
import {isEmptyObject} from "../common/object/isEmptyObject";
import {mapObject} from "../common/object/mapObject";
import {AnyFormField, AnyFormFields, FormError, FormFieldType, loadFormFieldValue, TAnyFormField} from "./FormField";
import {AnyRpc, Rpc, RpcConfigType, RpcConnectionType, RpcHandler, RpcHandlerType} from "./Rpc";


export type MapFormFields<F extends AnyFormFields,
    P extends keyof TAnyFormField> =
    { [K in keyof F]: FormFieldType<F[K]>[P] };

type FormCheckResult =
    { type: "valid" }
    | { type: "invalid", reasons: Record<string, any> };

type FormSubmitResult<R> =
    { type: "invalid", reasons: Record<string, any> }
    | { type: "fail", reason: any }
    | { type: "success", value: R };

export type AnyForm = Form<any, any>;



export type Form<F extends AnyFormFields, R> =
    { fields: F } &
    Rpc<{
        Handler:
            & RpcHandler<{ type: "check", data: MapFormFields<F, 'Data'> }, FormCheckResult>
            & RpcHandler<{ type: "getElement" }, MapFormFields<F, 'Element'>>
            & RpcHandler<{ type: "remote", name: string, payload: any }, any>
            & RpcHandler<{ type: "submit", data: MapFormFields<F, 'Data'> }, FormSubmitResult<R>>,
        Connection: {
            fields: { [K in keyof F]: RpcConnectionType<F[K]> }

            submit(data: MapFormFields<F, 'Data'>): Promise<FormSubmitResult<R>>;
            check(data: MapFormFields<F, 'Data'>): Promise<FormCheckResult>

            getElement(): Promise<MapFormFields<F, 'Element'>>;
        }
        Config: {
            fields: { [K in keyof F]: RpcConfigType<F[K]> }
            submit?(value: MapFormFields<F, 'Value'>): Promise<R>;
        }
    }>;


export function Form<R = any>():
    <F extends AnyFormFields> (fields: F) => Form<F, R> {
    return <any>((fields: Record<string, AnyFormField>): AnyForm => {
        return {
            fields,
            connect(handler: RpcHandlerType<Form<any, any>>): RpcConnectionType<Form<any, any>> {
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
            handle(config: RpcConfigType<Form<any, any>>): RpcHandlerType<Form<any, any>> {

                const fieldNameToHandler:
                    Record<string, RpcHandlerType<AnyFormField>> = mapObject(fields, (field, name) => {
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

                            for (const [name, field] of entries(fields)) {

                                let value;
                                try {
                                    value = await loadFormFieldValue(field.props, config.fields[name],
                                        payload.data[name])
                                } catch (error) {
                                    if (error instanceof FormError) {
                                        reasons[name] = error.reason;
                                        continue;
                                    }
                                    throw new Error()
                                }
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

