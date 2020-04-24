import {Component, ReactElement, ReactNode} from "react";
import {JSONExp} from "../json-exp/JSONExp";
import {Debounce} from "../react/utils/hooks/useDebounce";
import {State} from "../react/utils/State";
import {DataFields, DataRow} from "./DataFields";
import {DataListItemProps} from "./DataList";
import {DataQuery, DataQueryItem, DataSort} from "./DataQuery";
import {DataSource} from "./DataSource";

export type AbstractDataListProps<T, Fields extends DataFields<T>> = {
    source: DataSource<T>;
    fields: Fields;
    searchBy?: JSONExp<T>[];
    pageSize?: number;


};

export abstract class AbstractDataList<T, Fields extends DataFields<T>,
    P extends AbstractDataListProps<T, Fields>>
    extends Component<P> {

    reloadDebounce = Debounce(100);

    @State('reload') page = 0;

    @State('reload') pageSize = this.props.pageSize ?? 0;

    @State() totalCount = 0;

    @State() isLoading = false;

    @State() data: Array<{ key: string, row: DataRow<T, Fields> }> = [];

    @State('search') text: string = "";

    @State('reload') sort?: DataSort<T>;

    @State() items: DataQueryItem<T, Fields>[] = [];

    protected getQueryOrder(): DataSort<T>[] {
        return this.sort ? [this.sort] : []
    }

    protected getQueryFilter(): JSONExp<T> {
        if (this.text && this.props.searchBy) {
            return {
                $all: this.props.searchBy.map(exp => ({
                    $search: {
                        in: exp,
                        text: this.text
                    }
                }))
            }
        }
    }

    getQuery(): DataQuery<T, Fields> {
        return {
            fields: this.props.fields,
            order: this.getQueryOrder(),
            filter: this.getQueryFilter(),
            count: this.totalCount === 0
        }
    }


    async reload() {
        this.isLoading = true;
        await this.reloadDebounce.wait();

        const {count, items} = await this.props.source.find(this.getQuery());
        if (typeof count === "number") {
            this.totalCount = count;
        }
        this.items = items;
        this.isLoading = false;
    }

    search() {
        this.totalCount = 0;
        this.page = 0;
        return this.reload();
    }

    abstract renderLoading(): ReactElement;

    abstract renderNoItems(): ReactElement;

    abstract renderItem(props: DataListItemProps<T, Fields>): ReactElement;

    abstract renderContainer(children: ReactNode[]): ReactElement;

    render() {
        if (this.isLoading) {
            return this.renderLoading();
        }
        if (!this.items.length) {
            return this.renderNoItems();
        }
        return this.renderContainer(
            this.items.map((item, index) =>
                this.renderItem({
                    row: item.row,
                    index,
                    key: item.key
                })
            ))
    }
}
