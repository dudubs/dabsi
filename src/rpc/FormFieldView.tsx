import {ReactElement, ReactNode} from "react";
import {Awaitable} from "../common/typings";
import {AnyFormField, FormFieldType} from "./FormField";
import {RpcConnectionType} from "./Rpc";


export type FormFieldViewProps<T extends AnyFormField> = {

    connection: RpcConnectionType<T>

    // TODO: <FormLoadDefaultContext> || <LoadDefault>
    noDefault?: boolean;

    onChange?(data: FormFieldType<T>['Data']): void;

    fieldRef?: (fieldView: FormFieldView<T> | null) => void;


};


export type FormFieldView<T extends AnyFormField> = {

    rejectError(error: FormFieldType<T>['Error'] | null): void

    getCheckedData(): Awaitable<FormFieldType<T>['Data']>;

    setElement(element: FormFieldType<T>['Element']): void

    reset(): void;
};


export class FormFieldViewError<T extends AnyFormField> extends Error {
    constructor(public error: FormFieldType<T>['Error']) {
        super();
    }
}
