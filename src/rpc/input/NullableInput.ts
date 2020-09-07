import {If} from "../../common/typings";
import {Input, TInput} from "./Input";

export type TNullableInput = TInput & { Nullable: boolean };

export type NullableInput<N extends  boolean, T extends TInput> = Input<{

    Controller: T['Controller']

    Data: T['Data'] | If<N, undefined>

    Value: T['Value'] | If<N, undefined>

    Props: T['Props'] & {
        nullable: N
    }

    Config: T['Config']

    Element: T['Element']

    Error: T['Error'] | 'REQUIRED'
}>;
