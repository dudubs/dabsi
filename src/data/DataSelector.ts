import {Type} from "../common/typings";
import {DataSelection} from "./DataSelection";
import {DataSource} from "./DataSource";

export function DataSelector<T, S extends DataSelection<T>>(
    type: Type<T>,
    selection: S
): {
    new(): DataSelection.Row<T, S>;

    ():any;

    select(source: DataSource<T>): DataSource<DataSelection.Row<T, S>>
} {

    Selector.select = function (source: DataSource<any>) {
        return source.withCursor({
            ...source.cursor,
            selection: DataSelection.merge(
                source.cursor.selection,
                <any>selection
            )
        })
    }

    return <any>Selector

    function Selector() {

    }
}
