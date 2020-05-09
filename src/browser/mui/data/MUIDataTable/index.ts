import {TableProps} from "@material-ui/core/Table";
import {MUIIconButtonProps} from "../../../../../browser/src/mui/components/MUIIconButton";
import {DataFields} from "../../../../data/DataFields";
import {DataTable, DataTableAction, DataTableColumnProps, DataTableProps} from "../../../../data/DataTable";
import {LangNode} from "../../../../localization/Lang";
import {MUITableColumnProps} from "../../MUITable/MUITableColumn";
import {MUIDataTableToolbarProps} from "./MUIDataTableToolbar";
import {renderTable} from "./renderTable";


export type MUIDataTableProps<T, Fields extends DataFields<T>> =
    DataTableProps<T, Fields, MUIDataTableColumnProps<T, Fields>> &
    MUIDataTableToolbarProps & {

    actions?: MUIDataTableAction<T, Fields>[];

    staticActions?: ({
        icon: string
        title: LangNode,
        handle?(table: AnyMUIDataTable): void
    })[];

    TableProps?: TableProps;

}

export type MUIDataTableAction<T, Fields extends DataFields<T>> =
    DataTableAction<T, Fields> & {
    MUIIconButtonProps?: Partial<MUIIconButtonProps>
};


export type MUIDataTableColumnProps<T, Fields extends DataFields<T>> = {
    MUIProps?: MUITableColumnProps;
    MUIBodyProps?: MUITableColumnProps;
    MUIHeadProps?: MUITableColumnProps;

} & DataTableColumnProps<T, Fields>;

export type AnyMUIDataTable<T = any, Fields extends DataFields<T> = any> =
    MUIDataTable<T, Fields>;


export class MUIDataTable<T, Fields extends DataFields<T> = {}>
    extends DataTable<T, Fields, MUIDataTableProps<T, Fields>> {


    render(): React.ReactNode {
        return renderTable(this);
    }
}

