import {createElement, Fragment, ReactNode} from "react";
import {DataKey} from "@dabsi/typedata/DataKey";
import {DataOrder} from "@dabsi/typedata/DataOrder";
import {DataRow} from "@dabsi/typedata/DataRow";
import {AbstractDataList, AbstractDataListProps} from "@dabsi/typedata/old/DataList/AbstractDataList";

export type DataListProps<T> = AbstractDataListProps<T> & {
    renderItem(props: {
        item: DataRow<T>,
        list: DataList<T>, index: number
    }): ReactNode;
};

export class DataList<T> extends AbstractDataList<T, DataListProps<T>> {

    render(): ReactNode {
        return createElement(Fragment, {
            children: this.items.map((item, index) => {
                return createElement(Fragment, {
                    key: DataKey(item),
                    children: this.props.renderItem({
                        item,
                        list: this,
                        index,
                    })
                })
            })
        })
    }

    getOrder(): DataOrder<T>[] {
        return [];
    }
}
