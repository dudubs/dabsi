import {TableProps} from "@material-ui/core/Table";
import {MUIIconButtonProps} from "../../../../../browser/src/mui/components/MUIIconButton";
import {DataFields} from "../../../../data/DataFields";
import {DataTable, DataTableAction, DataTableColumnProps, DataTableProps} from "../../../../data/DataTable";
import {LangNode} from "../../../../localization/Lang";
import {MUITableColumnProps} from "../../MUITable/MUITableColumn";
import {MUIDataTableToolbarProps} from "./MUIDataTableToolbar";
import {renderTable} from "./renderTable";


export type MUIDataTableProps<T> =
    DataTableProps<T, MUIDataTableColumnProps<T>> &
    MUIDataTableToolbarProps & {



    actions?: MUIDataTableAction<T>[];

    staticActions?: ({
        icon: string
        title: LangNode,
        handle?(table: AnyMUIDataTable): void
    })[];

    TableProps?: TableProps;

}

export type MUIDataTableAction<T> =
    DataTableAction<T> & {
    MUIIconButtonProps?: Partial<MUIIconButtonProps>
};


export type MUIDataTableColumnProps<T> = {
    MUIProps?: MUITableColumnProps;
    MUIBodyProps?: MUITableColumnProps;
    MUIHeadProps?: MUITableColumnProps;

} & DataTableColumnProps<T>;

export type AnyMUIDataTable<T = any> =
    MUIDataTable<T>;


export class MUIDataTable<T>
    extends DataTable<T, MUIDataTableProps<T>> {


    render(): React.ReactNode {
        return renderTable(this);
    }
}

