import {Component, ReactNode} from "react";
import {ImmutableSet} from "../../immutable2";
import {JSONExp} from "../../json-exp/JSONExp";
import {Debounce} from "../../react/utils/hooks/useDebounce";
import {State} from "../../react/utils/State";
import {DataFields} from "../DataFields";
import {DataItem} from "../DataItem";
import {DataOrder, DataQuery} from "../DataQuery";
import {DataSource} from "../DataSource";


export type AbstractDataListProps<T> = {
    source: DataSource<T>;

    searchIn?: JSONExp<T>[];


    pageSize?: number;
};


// TODO: Merge to AbstractDataTable class.
export abstract class AbstractDataList<T, Props extends AbstractDataListProps<T>>
    extends Component<Props> {

    reloadDebounce = Debounce(100);

    @State() items: DataItem<any>[] = [];

    @State() isLoading = false;

    @State('reload') pageSize = this.props.pageSize ?? 10;

    @State('reload') page = 0;

    @State() totalCount: number = 0;

    @State('search') text: string = "";

    @State('reload') sort?: DataOrder<T>;

    @State() selectedKeys = ImmutableSet<string>();

    @State() selectAll = false;

    @State('reload') source = this.props.source;

    updateSource(getSource: (source: DataSource<T>) => DataSource<T>) {
        this.source = getSource(this.props.source);
        this.totalCount = 0;
    }

    toggleSelect(key: string) {
        this.selectedKeys =
            this.selectedKeys.has(key) ?
                this.selectedKeys.clear() :
                this.selectedKeys.clear().add(key);
    }


    abstract getOrder(): DataOrder<T>[];

    getQuery(): DataQuery<any> {
        const {text, props: {searchIn}} = this;
        const textFilter = !(text && searchIn) ? undefined : {
            $and: searchIn.map(exp => ({$search: {in: exp, text}}))
        };

        return {
            count: !this.totalCount,
            order: [
                ...!this.sort ? [] : [this.sort],
                ...this.getOrder()],
            skip: this.pageSize * this.page,
            take: this.pageSize,
            filter: textFilter
        }
    }

    getQuerySource(): DataSource<any> {
        return this.source
    }

    async reload() {
        this.isLoading = true;
        await this.reloadDebounce.wait();
        const result = await this.getQuerySource()
            .query(this.getQuery());
        if (result.count)
            this.totalCount = result.count;
        this.items = result.items;
        this.isLoading = false;
    }

    async search() {
        this.totalCount = 0;
        this.page = 0;
        await this.reload();
    }

    abstract render(): ReactNode;

}
