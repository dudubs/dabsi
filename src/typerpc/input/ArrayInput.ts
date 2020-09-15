import {
    Awaitable,
    If,
    Is,
    PartialUndefinedKeys,
    UndefinedIfEmptyObject,
    UndefinedIfIsUndefined
} from "../../common/typings";
import {Parameter} from "../Parameter";
import {RpcConfig} from "../Rpc";
import {RpcConfigFactory} from "../RpcGenericConfig";
import {WidgetElement} from "../widget/Widget";
import {ArrayInputContext} from "./ArrayInputContext";
import {AnyInput, Input, InputData, InputError, InputValue} from "./Input";
import {ValueOrAwaitableFn} from "./ValueOrAwaitableFn";

/*

DataInputMap<Product>()(
    InputMap({
        amount: NumberInput(),
        notes: ArrayInput(
            InputMap({
                text: TextInput(),
                isPrivate: BoolInput()
            })
        )
    })
)

 */
export type ArraySchemaError =
    'TOO_MANY_ITEMS' | 'TOO_FEW_ITEMS';


export type ArrayInput<T extends AnyInput> = Input<{

    Item: T;

    Data: InputData<T>[]

    Value: InputValue<T>[]

    Props: {}

    Config: UndefinedIfEmptyObject<PartialUndefinedKeys<{

        itemConfig: RpcConfig<T> |
            UndefinedIfIsUndefined<RpcConfig<T>>

    }, {

        getDefaultConfig?: () => Awaitable<RpcConfig<T>[]>

        getItemConfig?: RpcConfigFactory<number, T>;

        maxLength?: number
        minLength?: number

    }>>

    Element: {
        items?: WidgetElement<T>[]
        maxLength?: number
        minLength?: number
    }

    Controller: Parameter<T, number, number>

    Error: ArraySchemaError | (InputError<T> | null)[]
}>;

export type ArrayInput2<T extends AnyInput> = Input<{



    Data: string

    Value: string

    Props: {}

    Config: UndefinedIfEmptyObject<PartialUndefinedKeys<{

        itemConfig: RpcConfig<T> |
            If<Is<RpcConfig<T>, undefined>, undefined>

    }>>

    Element: {
        items?: WidgetElement<T>[]
        maxLength?: number
        minLength?: number
    }

    Controller: Parameter<T, number, number>

    Error: ArraySchemaError | (InputError<T> | null)[]
}>;

export function ArrayInput<T extends AnyInput>(item: T): ArrayInput<T> {
    return <any>Input<ArrayInput<AnyInput>>({
        controller: Parameter<number>()(
            item
        ),
        context: ArrayInputContext
    })
}

/*

    ArrayInput ... configure {
        default: ["bar","foo","hello"],
        getItemConfig: ($, {index, value}) => $({
            default: value
        })
    }

 */
