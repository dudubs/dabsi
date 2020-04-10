import React, {ComponentType, Fragment} from "react";
import {KeyField, withDefaultKeyField} from "../KeyField";
import {Layout} from "../Layout";


export type BaseListViewProps<T> = {
    Container?: Layout.Container
    Progress?: Layout;
    Between?: Layout,
    Empty?: Layout,
    EmptyContainer?: Layout,
    End?: Layout,
    Start?: Layout,
    keyField: KeyField<T>;
};

export type ListViewProps<T> = BaseListViewProps<T> & {
    data: T[],
    children(item: T, _: { item: T, index: number });
};


export type ListView<T> = ComponentType<ListViewProps<T>>;

export function ListView<T>(
    {
        data, Container: _Container, children: renderItem,
        End, Start, Empty,
        Between,
        keyField,
        EmptyContainer
    }: ListViewProps<T>) {
    const Container = _Container ?? {type: Fragment};

    if ((!data.length) && EmptyContainer)
        return Layout(EmptyContainer);

    return Layout.Container(Container, <>
        {Layout(Start)}

        {!data.length ? Layout(Empty) :
            data.map((item, index) => {
                let element = renderItem(item, {
                    item, index,
                });

                if (Between && (index > 0)) {
                    element = <>{Layout(Between)}{element}</>;
                }

                return withDefaultKeyField(keyField, item, element);
            })}
        {Layout(End)}
    </>)
}
