import {DataRow} from "../../data/DataRow";
import {DataSelection} from "../../data/DataSelection";
import {DataSelectionRow} from "../../data/DataSelectionRow";
import {DataSource} from "../../data/DataSource";
import {RpcGenericConfigurator} from "../RpcConfigurator";
import {NullableInputOptions} from "./NullableInput";
import {SelectInput} from "./SelectInput";
import {ValueOrAwaitableFn} from "./ValueOrAwaitableFn";

export type DataSelectInputConfig<T,
    S extends DataSelection<T>> = {
    source: DataSource<T>
    selection?: S
    default?: ValueOrAwaitableFn<string | DataRow<T> | undefined>
    getLabel(row: DataRow<DataSelectionRow<T, S>>): string;
};


export type DataSelectInput<T, N extends boolean> =
    RpcGenericConfigurator<SelectInput<T, N>, (


        <S extends DataSelection<T> = {}>(
            config: DataSelectInputConfig<T, S>
        ) => DataSelectInputConfig<T, any>


        )>;


export function DataSelectInput<T>() {
    return <N extends boolean = true>(options: NullableInputOptions<N> = {}): DataSelectInput<T, N> => {
        return <any>RpcGenericConfigurator<DataSelectInput<any, any>>(
            SelectInput(options),

            // server:start
            config => ({
                default: () => ValueOrAwaitableFn(config.default)
                    .then(value => {
                        if (typeof value === "object")
                            return value?.$key;
                        return value
                    }),
                load: key => config.source.get(key),
                options: () => config.source
                    .createAsMutable()
                    .select(config.selection)
                    .items()
                    .then(rows => {
                        return rows.map(row => ({
                            key: row.$key,
                            label: config.getLabel(row)
                        }))
                    })
            })
            // server:end
        )
    }
}


// TypeRef<"User", AppTypes>
