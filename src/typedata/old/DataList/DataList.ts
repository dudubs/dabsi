import {createElement, Fragment, ReactNode} from "react";
import {DataKey} from "../../DataKey";
import {DataOrder} from "../../DataOrder";
import {DataRow} from "../../DataRow";
import {AbstractDataList, AbstractDataListProps} from "./AbstractDataList";

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