import {DataSource} from "./DataSource";

export type DataListProps<T> = {
    source: DataSource<T>;
};

export abstract class DataList<T> {

}

// Users.pick([...], {
//
// })

// PickedDataSource<T, K, Fields>

/*

    <DataList source={Users}

    />
 */
