import LinearProgress from "@material-ui/core/LinearProgress";
import List, {ListProps} from "@material-ui/core/List";
import ListItem, {ListItemTypeMap} from "@material-ui/core/ListItem";
import ListItemText, {ListItemTextProps} from "@material-ui/core/ListItemText";
import React, {ReactNode} from "react";
import {InfinityScrollProps} from "../../../../browser/src/junk/doIfScrollEnded";
import {DataItem, DataKey} from "../../../data/DataItem";
import {DataSource} from "../../../data/DataSource";

import {DataExp} from "../../../json-exp/DataExp";
import {Debounce} from "../../../react/utils/hooks/useDebounce";
import {AfterMountView, View} from "../../../react/view/View";
import {ViewState} from "../../../react/view/ViewState";
import {MuiDialog, MuiDialogProps} from "../form/MuiDialog";
import {ReactWrapper, wrap} from "./wrap";


export type MuiDataPickerProps<T> = {
    source: DataSource<T>;

    pageSize?: number;
    onPick?(item: DataItem<T>): void

    getTextFilter?(text: string): DataExp<T>;

    // renderItem(item: DataItem<P>): ReactNode

    ListProps?: Partial<ListProps>;
    ListItemProps?: Partial<ListItemTypeMap<{}, "div">>;
    MuiDialogProps?: Partial<MuiDialogProps>;
    ListItemTextProps?: Partial<ListItemTextProps>;
    title?: ReactNode


    listWrapper?: ReactWrapper;

    renderPrimaryTitle(row: DataItem<T>): ReactNode;
    renderSecondaryTitle?(row: DataItem<T>): ReactNode;

};

export class MuiDataPicker<T> extends View<MuiDataPickerProps<T>> {

    @ViewState() totalCount = 0;

    @ViewState() items: DataItem<T>[] = [];

    @ViewState('reload') filter: DataExp<T> = undefined;

    @ViewState() isLoading = false;

    reloadDebounce = Debounce();

    pageSize = this.props.pageSize ?? 20;

    @ViewState('reload') source: DataSource<T> = this.props.source;

    updateSource(getSource: (source: DataSource<T>) => DataSource<T>) {
        this.source = getSource(this.props.source);
        this.items = [];
    }

    @AfterMountView()
    async reload() {
        this.isLoading = true;
        await this.reloadDebounce.wait(500, true);

        if (this.totalCount) {

            this.items = await this.source
                .take(this.pageSize)
                .filter(this.filter)
                .items()
        } else {
            [this.totalCount, this.items] = await this.source
                .take(this.pageSize)
                .filter(this.filter)
                .countAndQuery()
        }
        this.isLoading = false;

    }

    loadMoreDebounce = Debounce();

    async loadMore() {
        this.isLoading = true;
        await this.loadMoreDebounce.wait(1000);

        this.items = [...this.items,
            ...(await this.source
                .take(this.pageSize)
                .skip(this.items.length)
                .items())
        ]

        this.isLoading = false;
    }


    renderView() {
        return <MuiDialog
            title={this.props.title}
            DialogContentProps={{
                ...InfinityScrollProps(
                    () => (!this.isLoading) &&
                        (this.totalCount > this.items.length),
                    () => this.loadMore()
                )
            }}
            cancellable
            {...this.props.MuiDialogProps}>
            {wrap(this.props.listWrapper)(
                <List {...this.props.ListProps}>
                    {this.items.map(item => {
                        return <ListItem button {...this.props.ListItemProps} key={DataKey(item)}
                                         onClick={() => {
                                             this.props.onPick?.(item);
                                         }}>
                            <ListItemText
                                {...this.props.ListItemTextProps}
                                primary={this.props.renderPrimaryTitle(item)}
                                secondary={this.props.renderSecondaryTitle?.(item)}
                            />
                        </ListItem>
                    })}
                </List>
            )}
            {this.isLoading && <LinearProgress/>}
        </MuiDialog>
    }
}


