import React, {ComponentType} from "react";
import {StoreProp} from "../Store";
import {BaseListViewProps, ListView} from "./ListView";

export type ListInputProps<T> = BaseListViewProps<T> &
    StoreProp<T[]> & {
    renderItem(props: { item: T, index: number } & StoreProp<T[]>)
};

export type ListInput<T> = ComponentType<ListInputProps<T>>;


export function ListInput<T>({store, renderItem, ...props}:
                                 ListInputProps<T>) {


    return <ListView<T>
        {...props}
        data={store.state}
    >{
        (_, props) => {
            return renderItem({...props, store})
        }
    }</ListView>


}

