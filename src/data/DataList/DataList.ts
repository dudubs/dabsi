import {AbstractDataList, AbstractDataListProps} from "./AbstractDataList";

export type DataListProps<T> = AbstractDataListProps<T> & {};

export abstract class DataList<T, Props extends DataListProps<T>> extends AbstractDataList<T, Props> {
    // getDataFields(): DataFields<T> {
    //     return undefined;
    // }
    //
    // getDataOrder(): DataOrder<T>[] {
    //     return [];
    // }
}
