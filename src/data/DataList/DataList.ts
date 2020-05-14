import {createElement, Fragment, ReactNode} from "react";
import {DataFields} from "../DataFields";
import {DataItem} from "../DataItem";
import {DataOrder} from "../DataQuery";
import {AbstractDataList, AbstractDataListProps} from "./AbstractDataList";

export type DataListProps<T> = AbstractDataListProps<T> & {
    renderItem(props: DataItem<T> & { list: DataList<T>, index: number }): ReactNode;
};

export class DataList<T> extends AbstractDataList<T, DataListProps<T>> {

    render(): ReactNode {
        return createElement(Fragment, {
            children: this.items.map((item, index) => {
                return createElement(Fragment, {
                    key: item.key,
                    children: this.props.renderItem({
                        ...item,
                        list: this,
                        index,
                    })
                })
            })
        })
    }

    getFields(): DataFields<T> {
        return this.props.source.getFields();
    }

    getOrder(): DataOrder<T>[] {
        return [];
    }
}
