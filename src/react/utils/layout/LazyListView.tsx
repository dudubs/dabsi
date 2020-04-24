import React, {Component} from "react";
import {WeakId} from "../../../common/WeakId";
import {withDefaultKeyField} from "../KeyField";
import {Layout} from "../Layout";
import {State} from "../State";
import {Store} from "../Store";
import {BaseListViewProps, ListView} from "./ListView";


export type LazyListViewProps<T> = BaseListViewProps<T> & {
    load(props: {
        page: number,
        pageSize: number,
        count: number
    }): Promise<{
        rows: T[],
        count: number
    }>;
    renderItem(props: { item: T, index: number });
    deps?: any[];
    pageSize?: number;
};


export class LazyListView<T> extends Component<LazyListViewProps<T>> {

    @State() isLoading = false;

    @State() pages: T[][] = [];

    @State() totalCount = 0;

    @State() count = 0;

    @State() error = undefined;

    componentDidUpdate(prevProps: Readonly<LazyListViewProps<T>>, prevState: Readonly<{}>, snapshot?: any): void {
        const prevDeps = prevProps.deps ?? [];
        const deps = this.props.deps ?? [];
        if (prevDeps.length !== deps.length) {
            this.reset()
        } else {

            for (const [index, dep] of deps.entries()) {
                if (prevProps[index] !== dep) {
                    this.reset();
                }
            }
        }
    }

    reset() {
        this.pages = [];
        this.count = 0;
        this.totalCount = 0;
        return this.nextPage();
    }

    componentDidMount(): void {
        this.nextPage();
    }

    get pageSize() {
        return this.props.pageSize ?? 20;
    }

    async nextPage() {
        const {state, pageSize} = this;
        if (this.isLoading)
            return;
        this.isLoading = true;
        const {rows, count} = await this.props.load({
            page: this.pages.length,
            pageSize,
            count: this.totalCount,
        });

        Object.assign(this, {
            isLoading: false,
            totalCount: count,
            count: this.count + count
        });

        // @ts-ignore
        Store.at(this, "pages").push(rows);

        this.isLoading = false;
    }

    Container = ({children}) => {
        return Layout.Container(this.props.Container, <>
            {children}
            {this.isLoading && Layout(this.props.Progress)}
        </>);
    };

    render() {
        const {pageSize} = this;
        const {
            load, deps,
            renderItem,
            keyField,
            pageSize: _pageSize,
            ...props
        } = this.props;
        if (this.error)
            throw this.error;
        return <ListView<T[]>
            {...props}
            Container={this.Container}
            keyField={WeakId}
            data={this.pages}
        >{
            (page, {index: pageIndex}) => {
                return <>
                    {page.map((item, indexInPage) => {
                        const index = pageIndex * pageSize + indexInPage;
                        return withDefaultKeyField(
                            keyField,
                            item,
                            renderItem({item, index})
                        )
                    })}
                </>
            }
        }</ListView>
    }

}
