import {Component, ReactNode} from "react";
import {ImmutableSet} from "../../immutable";
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


export abstract class AbstractDataList<T, Props extends AbstractDataListProps<T>>
    extends Component<Props> {

    reloadDebounce = Debounce(100);

    @State() items: DataItem<any>[] = [];

    @State() isLoading = false;

    @State('reload') pageSize = this.props.pageSize ?? 0;

    @State('reload') page = 0;

    @State() totalCount: number = 0;

    @State('search') text: string = "";

    @State('reload') sort?: DataOrder<T>;

    @State() selectedKeys = ImmutableSet<string>();

    @State() selectAll = false;

    toggleKey(key: string) {
        this.selectedKeys = this.selectedKeys.has(key) ? this.selectedKeys.delete(key) :
            this.selectedKeys.add(key);
    }

    abstract getFields(): DataFields<T>;

    abstract getOrder(): DataOrder<T>[];

    getQuery(): DataQuery<any> {
        const {text, props: {searchIn}} = this;
        const textFilter = !(text && searchIn) ? undefined : {
            $all: searchIn.map(exp => ({$search: {in: exp, text}}))
        };

        return {
            order: [
                ...!this.sort ? [] : [this.sort],
                ...this.getOrder()],
            skip: this.pageSize * this.page,
            take: this.pageSize,
            filter: textFilter
        }
    }

    async reload() {
        this.isLoading = true;
        await this.reloadDebounce.wait();
        const result = await this.props.source
            .select(this.getFields())
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
