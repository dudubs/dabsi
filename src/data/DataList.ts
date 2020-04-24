import {ReactElement, ReactNode} from "react";
import {Layout} from "../react/utils/Layout";
import {AbstractDataList, AbstractDataListProps} from "./AbstractDataList";
import {DataFields, DataRow} from "./DataFields";
import {ListItemProps} from "./ListItem";
import {ListLayoutProps} from "./ListLayout";


export type DataListItemProps<T, Fields extends DataFields<T>> =
    ListItemProps<DataRow<T, Fields>>;


export type DataListProps<T, Fields extends DataFields<T>> =
    AbstractDataListProps<T, Fields> & ListLayoutProps<DataRow<T, Fields>>;

export class DataList<T, Fields extends DataFields<T>>
    extends AbstractDataList<T, Fields, DataListProps<T, Fields>> {

    renderContainer(children: ReactNode[]): ReactElement {
        return Layout.Container(this.props.Container, children);
    }

    renderItem(props: DataListItemProps<T, Fields>):ReactElement {
        return Layout(this.props.Item, props);
    }

    renderLoading(): ReactElement {
        return Layout(this.props.Loading)
    }

    renderNoItems(): ReactElement {
        return Layout(this.props.NoItems);
    }

}
