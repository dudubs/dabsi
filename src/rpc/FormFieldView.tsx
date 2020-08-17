import {Awaitable} from "../common/typings";
import {AnyFormField, FormFieldDataOf, FormFieldElementOf} from "./FormField";
import {RpcConnectionOf} from "./Rpc";


export type FormFieldViewProps<T extends AnyFormField> = {

    connection: RpcConnectionOf<T>

    noDefault?: boolean;

    onChange?(data: FormFieldDataOf<T>): void;

    fieldRef?: (fieldView: FormFieldView<T>) => void;

};


export type FormFieldView<T extends AnyFormField> = {
    reject(error: any): void

    getData(): Awaitable<FormFieldDataOf<T>>;

    setElement(element: FormFieldElementOf<T>): void

    reset(): void;
};

