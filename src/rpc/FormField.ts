import {Awaitable} from "../common/typings";
import {FormFieldConnection} from "./FormFieldConnection";
import {InternalFormField} from "./InternalFormField";
import {MappedRpcHandlerFn} from "./MappedRpcHandlerFn";
import {AnyRpc, Rpc, RpcConfigType, RpcPayloadType} from "./Rpc";


// TODO: R extends AnyRpc

export type TFormField = {
    Data: any
    Value: any,
    Remote: AnyRpc,
    Options: any,
    Config: any,
    Element: any,
    Error: any
};


export type FormFieldType<T extends AnyFormField> =
    T extends FormField<infer U> ? U : never;

export type AnyFormField = FormField<any>;

export type AnyFormFields = Record<string, AnyFormField>;

export type FormFieldProps<T extends TFormField> = {


    check(config: T['Config'], value: T['Value']):
        Awaitable<T['Error'] | undefined>;

    // TODO: rename
    load(config: T['Config'], data: T['Data']): Awaitable<T['Value']>;

    remote: T['Remote'],
    options: T['Options'],

    getRemoteConfig(config: T['Config']): RpcConfigType<T['Remote']>
    getElement(config: T['Config']): Awaitable<T['Element']>;
};


export type FormFieldHandlerTypes<T extends TFormField> = {

    // TODO: data is optional?
    getElement(): T['Element']
    check(payload: { data: T['Data'] }): T['Element']
    remote(payload: { payload: RpcPayloadType<T['Remote']> }): T['Element']
};

// Con<{}>


export type FormFieldRpc<T extends TFormField> = Rpc<{
    Handler: MappedRpcHandlerFn<FormFieldHandlerTypes<T>>

    Connection: FormFieldConnection<T>,
    Config: T['Config']
}>;

export type FormField<T extends TFormField> =
    { TFormField?: T } & FormFieldRpc<T> & InternalFormField<T>;

export function FormField<T extends TFormField>(
    props: FormFieldProps<T>
): FormField<T> {
    return new InternalFormField(props)
}


export type MapFormFields<T extends AnyFormFields,
    P extends keyof TFormField> =
    { [K in keyof T]: FormFieldType<T[K]>[P] };

export type FormFieldsConfig<T extends AnyFormFields> =
    { [K in keyof T]: RpcConfigType<T[K]> };
