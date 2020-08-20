import {Awaitable} from "../common/typings";
import {FormConnection} from "./FormConnection";
import {AnyFormFields, FormFieldsConfig, MapFormFields} from "./FormField";
import {InternalForm} from "./InternalForm";
import {MappedRpcHandlerFn} from "./MappedRpcHandlerFn";
import {Rpc, RpcConnectionType} from "./Rpc";


export type CheckResult<Error> =
    { type: "valid" } | { type: "invalid", error: Error };

export type FormCheckResult<T extends TForm> =
    CheckResult<MapFormFields<T['Fields'], 'Error'>>;

export type FormSubmitResult<T extends TForm> =
    { type: "invalid", error: MapFormFields<T['Fields'], 'Error'> }
    | { type: "result", value: T['Result'] };

export type AnyForm = Form<TForm>;

export type TFormArgs<Fields extends AnyFormFields, Result> = {
    Fields: Fields,
    Result: Result
};

export type TForm = {
    Fields: AnyFormFields,
    Result: any
};

export type FormRpc<T extends TForm> = Rpc<{
    Handler: MappedRpcHandlerFn<FormHandlerTypes<T>>

    Connection: FormConnection<T>

    Config: {
        fields: FormFieldsConfig<T['Fields']>
        submit(value: MapFormFields<T['Fields'], 'Value'>): Awaitable<T['Result']>;
    }
}>;

export type Form<T extends TForm> =
    { TForm?: T } & FormRpc<T> & InternalForm<T>;


export type FormHandlerTypes<T extends TForm> = {

    check(payload: { data: FormData<T> }): FormCheckResult<T>;

    getElement(): FormElement<T>;

    remote(payload: [string, any]): any;

    submit(payload: { data: FormData<T> }): FormSubmitResult<T>;

};

export type FormConnectionFields<T extends TForm> =
    { [K in keyof T['Fields']]: RpcConnectionType<T['Fields'][K]> };


export type FormData<T extends TForm> = MapFormFields<T['Fields'], 'Data'>;

export type FormElement<T extends TForm> = MapFormFields<T['Fields'], 'Element'>;

export function Form<Result = any>():
    <Fields extends AnyFormFields>(fields: Fields) =>
        Form<TFormArgs<Fields, Result>> {

    return fields => new InternalForm(fields)
}

