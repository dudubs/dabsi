import {HasKeys, If, IsNever, Union} from "../common/typings";
import {BaseTypeKey} from "./BaseType";
import {DataFields, DataFieldsRow} from "./DataFields";
import {DataKey} from "./DataKey";
import {DataSource, DataValues} from "./DataSource";
import {DataTypeKey, DataUnion, DataUnionChildren, DataUnionChildrenKey, DataUnionChildrenOf} from "./DataUnion";
import {MapRelation, RelationKeys, RelationTypeAt} from "./Relation";

type DataUnionChildrenRow<Children> = {
    [K in keyof Children]:
    Record<DataKey, string> &
    Record<DataTypeKey, K> &
    DataRow<Children[K]>
};


export type DataUnionRow<T extends DataUnionChildren<any>,
    K extends keyof DataUnionChildrenOf<T>> =
    DataRow<DataUnionChildrenOf<T>[K]>;

export type DataRow<T> =
    T extends DataUnionChildren<infer Children> ?
        HasKeys<Children> extends true ?
            Union<DataUnionChildrenRow<Children>> :
            _NoChildren<T> :
        _NoChildren<T> ;


type TDataRow = Record<DataKey, string>;

export type DataBaseRow = {

    pick<T extends TDataRow, Fields extends DataFields<T>>(
        this: T,
        fields: Fields): Promise<DataRow<DataFieldsRow<T, Fields>>>;

    at<T extends TDataRow, K extends RelationKeys<T>>(
        this: T, relationKey: K):
        DataSource<RelationTypeAt<T, K>>;

    delete<T extends TDataRow, K extends RelationKeys<T>>(this: T):
        Promise<void>;

    remove<T extends TDataRow, K extends RelationKeys<T>>(this: T):
        Promise<void>;


    update<T extends TDataRow>(this: T,
                               values: DataValues<T>):
        Promise<boolean>;

    reload<T extends TDataRow>(this: T): Promise<DataRow<T>>;
};

export function DataBaseRow<T>(source: DataSource<T>): DataBaseRow {
    return {
        at(propertyName) {
            return <any>source.at(<any>propertyName, this.$key)
        },
        pick(fields: any): any {
            return source.pick(fields).getOrFail(this.$key)
        },
        delete() {
            return source.deleteKey(this.$key)
        },
        remove() {
            return source.removeKey(this.$key)
        },
        update(values) {
            return source.updateKey(this.$key, <any>values)
        },
        reload() {
            return <any>source.getOrFail(this.$key);
        }
    }
}

export type _NoChildren<T> =
    DataBaseRow
    & Omit<T, DataUnionChildrenKey | RelationKeys<T> | BaseTypeKey>
    & Record<DataKey, string>
    & {
    [K in RelationKeys<T>]:
    MapRelation<T[K],
        DataRow<RelationTypeAt<T, K>>>
}


