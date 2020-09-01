import {Constructor, Type} from "../common/typings";
import {DataSelection} from "./DataSelection";
import {DataSelectionRow} from "./DataSelectionRow";
import {DataSource} from "./DataSource";
import {DataTypeInfo} from "./DataTypeInfo";

export function DataSelector<T, S extends DataSelection<T>>(
    type: Constructor<T>,
    selection: S
): {
    new(): DataSelectionRow<T, S>;

    select(source: DataSource<T>): DataSource<DataSelectionRow<T, S>>
} {



    Selector[DataTypeInfo.symbol] = {
        ...DataTypeInfo.get(type)
    };

    Selector.select = function (source: DataSource<any>) {
        return source.updateCursor({
            selection: DataSelection.merge(
                source.cursor.selection,
                <any>selection
            )
        })
    }

    return <any>Selector

    function Selector() {
        throw new Error()
    }
}
