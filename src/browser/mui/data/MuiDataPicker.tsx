import LinearProgress from "@material-ui/core/LinearProgress";
import List, {ListProps} from "@material-ui/core/List";
import ListItem, {ListItemTypeMap} from "@material-ui/core/ListItem";
import ListItemText, {ListItemTextProps} from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import React, {ReactNode} from "react";
import {InfinityScrollProps} from "../../../../browser/src/junk/doIfScrollEnded";
import {DataKey} from "../../../data/DataKey";
import {DataRow} from "../../../data/DataRow";
import {DataSource} from "../../../data/DataSource";

import {DataExp} from "../../../json-exp/DataExp";
import {Lang} from "../../../localization/Lang";
import {PickerProps} from "../../../react/ModalStack";
import {Debounce} from "../../../react/utils/hooks/useDebounce";
import {AfterMountView, View} from "../../../react/view/View";
import {ViewState} from "../../../react/view/ViewState";
import {MuiDialog, MuiDialogProps} from "../form/MuiDialog";
import {ReactWrapper, wrap} from "./wrap";


export type MuiDataPickerProps<T> = PickerProps<DataRow<T>> & {
    source: DataSource<T>;

    pageSize?: number;

    getTextFilter?(text: string): DataExp<T>;

    // renderItem(item: DataRow<P>): ReactNode

    ListProps?: Partial<ListProps>;
    ListItemProps?: Partial<ListItemTypeMap<{}, "div">>;
    MuiDialogProps?: Partial<MuiDialogProps>;
    ListItemTextProps?: Partial<ListItemTextProps>;
    title?: ReactNode


    listWrapper?: ReactWrapper;

    renderPrimaryTitle(row: DataRow<T>): ReactNode;
    renderSecondaryTitle?(row: DataRow<T>): ReactNode;

    renderNoRows?(): ReactNode;
};

export class MuiDataPicker<T> extends View<MuiDataPickerProps<T>> {

    @ViewState() totalCount = 0;

    @ViewState() items: DataRow<T>[] = [];

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

    renderNoRows() {
        return this.props.renderNoRows ? this.props.renderNoRows() :
            <Typography>{Lang`NO_ROWS`}</Typography>
    }

    renderItem(item: DataRow<T>, index: number) {
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
            {this.isLoading ? <LinearProgress/> : (
                this.items.length ? wrap(this.props.listWrapper)(
                    <List {...this.props.ListProps}>
                        {this.items.map((item, index) => {
                            return this.renderItem(item, index)
                        })}
                    </List>
                ) : (
                    this.renderNoRows()
                )
            )}
        </MuiDialog>
    }
}


