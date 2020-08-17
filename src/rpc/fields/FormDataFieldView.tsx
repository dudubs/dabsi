import {FormFieldViewProps} from "../FormFieldView";
import {FormDataField} from "./FormDataField";

export type FormDataFieldViewProps<T> =
    FormFieldViewProps<FormDataField<T>>;
