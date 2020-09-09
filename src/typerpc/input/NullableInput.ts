import {If} from "../../common/typings";
import {Input, TInput} from "./Input";

export type NullableInputOptions<N extends boolean> = { nullable?: N };

export type NullableInput<N extends boolean, T extends TInput> = Input<{

    Controller: T['Controller']

    Data: T['Data'] | If<N, null>

    Value: T['Value'] | If<N, null>

    Props: T['Props'] & {
        nullable: N
    }

    Config: T['Config']

    Element: T['Element']

    Error: T['Error'] | 'REQUIRED'
}>;



