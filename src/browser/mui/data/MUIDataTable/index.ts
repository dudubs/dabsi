import {TableProps} from "@material-ui/core/Table";
import {DataKey} from "../../../../data/DataKey";
import {DataRow} from "../../../../data/DataRow";
import {DataTable, DataTableAction, DataTableColumnProps, DataTableProps} from "../../../../data/DataTable";
import {LangNode} from "../../../../localization/Lang";
import {MuiButtonProps} from "../../components/MuiButton";
import {MuiIcon} from "../../MuiIcon";
import {MuiTableColumnProps} from "../../MuiTable/MuiTableColumn";
import {MuiDataTableToolbarProps} from "./MuiDataTableToolbar";
import {renderTable} from "./renderTable";


export type MuiDataTableProps<T> =
    DataTableProps<T, MuiDataTableColumnProps<T>> &
    MuiDataTableToolbarProps & {


    onPick?(key: string): void;

    isSelected?(item: DataRow<T>): boolean;

    actions?: MuiDataTableAction<T>[];

    staticActions?: ({
        icon: MuiIcon,
        title: LangNode,
        handle?(table: AnyMuiDataTable): void
    })[];

    TableProps?: TableProps;

    expandFirstItem?: boolean;
    renderItemCollapse?(item: DataRow<T>, table: MuiDataTable<any>);

}

export type MuiDataTableAction<T> =
    DataTableAction<T> & {
    MuiButtonProps?: Partial<MuiButtonProps>
};


export type MuiDataTableColumnProps<T> = DataTableColumnProps<T> & {
    MuiProps?: MuiTableColumnProps;
    MuiBodyProps?: MuiTableColumnProps;
    MuiHeadProps?: MuiTableColumnProps;

};

export type AnyMuiDataTable<T = any> =
    MuiDataTable<T>;


export class MuiDataTable<T>
    extends DataTable<T, MuiDataTableProps<T>> {


    render(): React.ReactNode {
        return renderTable(this);
    }

    get isMultiSelection() {
        return (!this.props.onPick) && this.multipleActions.length > 0
    }

    toggleSelect(key: string) {
        if (this.isMultiSelection)
            super.toggleSelect(key);
        else {
            this.selectedKeys =
                this.selectedKeys.has(key) ?
                    this.selectedKeys.clear() :
                    this.selectedKeys.clear().add(key);
        }
    }

    getSelectedItems() {
        return this.items.filter(item => this.selectedKeys.has(DataKey(item)));
    }

    toggleSelectAll() {
        const selectedItems = this.getSelectedItems();
        const allSelectedItems = selectedItems.length === this.items.length;

        if (allSelectedItems) {
            this.selectedKeys = this.selectedKeys.clear();
        } else {
            const selectedKeys = this.selectedKeys.asMutable();
            for (let item of this.items) {
                selectedKeys.add(item.$key)
            }
            this.selectedKeys = selectedKeys.asImmutable();
        }
    }


}

