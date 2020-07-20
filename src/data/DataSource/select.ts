import {DataSelection} from "../DataSelection";
import {DataSource} from "./DataSource";


function select<T, S extends DataSelection<T>>(
    this: DataSource<T>,
    selection: S
): DataSource<DataSelection.Row<T, S>> {
    throw new Error()
}
