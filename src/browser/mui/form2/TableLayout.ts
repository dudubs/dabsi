import {ReactElement, ReactNode} from "react";
import {mapObjectToArray} from "../../../common/object/mapObjectToArray";

type TableLayoutColumnProps<C> = {
    key: string,
    props: C,
    index: number
};
type TableLayoutRowProps<D> = {
    key: string,
    data: D,
    index: number
};
type TableLayoutProps<T, C, D> = {
    columns: Record<string, C>
    rows: T[],
    getRowKey: (row: T) => string
    getRowData: (row: T) => D
    renderColumn: (props: TableLayoutColumnProps<C>,
                   children: ReactNode) => ReactNode;
    // TODO: rename to renderColumnTitle

    renderTitle: (props: TableLayoutColumnProps<C>) => ReactNode,
    renderRowColumn: (
        data: any,
        row: TableLayoutRowProps<D>,
        column: TableLayoutColumnProps<C>,
        key:string,
    ) => ReactNode,

    renderRow: (props: TableLayoutRowProps<D>, children: ReactNode) => ReactNode;

    render(props: {
        columns: ReactNode[]
        rows: ReactNode[]
    }): ReactElement;
};

export function TableLayout<T, C, D>(
    props: TableLayoutProps<T, C, D>
) {

    const columns = mapObjectToArray(props.columns, (props, key, index) => {
        return {props, key, index}
    })

    return props.render({
        columns: columns.map(column =>
            props.renderColumn(column,
                props.renderTitle(column))),
        rows: props.rows.map((item, index) => {
            const row = {
                key: props.getRowKey(item),
                data: props.getRowData(item),
                index
            };
            return props.renderRow(row, columns.map(column => {
                return props.renderColumn(column,
                    props.renderRowColumn(row.data[column.key], row, column, row.key)
                )
            }))
        })
    })
}
