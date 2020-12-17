import { ReactNode } from "react";
import { MuiIcon } from "@dabsi/browser/mui/components/MuiIcon";
import { Awaitable } from "@dabsi/common/typings";
import { LangNode } from "@dabsi/lang/Lang";
import { State } from "@dabsi/react/utils/State";
import { DataExp } from "@dabsi/typedata/DataExp";
import {
  AbstractDataList,
  AbstractDataListProps,
} from "@dabsi/typedata/old/DataList/AbstractDataList";
import { DataOrder } from "@dabsi/typedata/DataOrder";
import { DataRow } from "@dabsi/typedata/DataRow";
import { DataSource } from "@dabsi/typedata/DataSource";
import { deleteAction } from "@dabsi/typedata/old/DataTable/actions/deleteAction";
import { removeAction } from "@dabsi/typedata/old/DataTable/actions/removeAction";

export type DataTableActionType = "single" | "multiple" | "both";

export type OldAnyDataTable<T = any> = DataTableOld<
  T,
  DataTableProps<T, DataTableColumnProps<T>>
>;

export type DataTableAction<T> = {
  icon?: MuiIcon;
  title: LangNode;
  type?: DataTableActionType;
  handleKeys?(keys: string[], table: OldAnyDataTable<T>): Awaitable;
  handleItem?(item: DataRow<T>, table: DataTableOld<T, any>): Awaitable;
  danger?: boolean;
  visible?: (item: DataRow<T>) => boolean;
  disabled?: (item: DataRow<T>) => boolean;
};

export type DataTableProps<
  T,
  ColumnProps extends DataTableColumnProps<T> = DataTableColumnProps<T>
> = AbstractDataListProps<T> & {
  title?: LangNode;

  removable?: "single" | "multiple" | "both" | boolean;

  deletable?: "single" | "multiple" | "both" | boolean;

  actions?: DataTableAction<T>[];

  columns: ColumnProps[];

  multiSort?: boolean;
};

export type DataTableColumnProps<T> = {
  field?: DataExp<T>;
  sortable?: boolean;
  title?: LangNode;
  empty?: LangNode;
  render?(
    props: { item: DataRow<T>; data: any },
    table: DataTableOld<T, any>
  ): ReactNode;
  renderContainer?(children: ReactNode): ReactNode;
};

export type DataSortType = "ASC" | "DESC";

export type DataTableColumn<T> = {
  index: number;
  key: string;
  sort?: DataSortType | undefined;
  sortNulls?: "first" | "last";
};

export abstract class DataTableOld<
  T,
  Props extends DataTableProps<T, DataTableColumnProps<T>>
> extends AbstractDataList<T, Props> {
  @State("reload") columns: (DataTableColumn<T> &
    Props["columns"][number])[] = this.props.columns.map((column, index) => {
    return {
      ...column,
      index,
      key: typeof column.field === "string" ? column.field : `_c_${index}`,
    };
  });

  multipleActions: DataTableAction<T>[] = [];

  singleActions: DataTableAction<T>[] = [];

  async executeSingleAction(action: DataTableAction<T>, key: string) {
    return this.executeAction(action, [key]);
  }

  async executeAction(action: DataTableAction<T>, keys: string[]) {
    if (action.handleItem) {
      await action.handleItem?.(await this.source.getOrFail(keys[0]), this);
    }
    await action.handleKeys?.(keys, this);
  }

  getQuerySource(): DataSource<T> {
    const fields: any = {};

    for (let column of this.columns) {
      if (column.field && typeof column.field !== "string") {
        fields[column.key] = column.field;
      }
    }

    return <any>super.getQuerySource().addFields(fields);
  }

  async componentDidMount() {
    super.componentDidMount?.();
    this.buildActions();
    await this.reload();
  }

  protected buildActions() {
    const { multipleActions, singleActions } = this;

    this.props.actions?.forEach(build);

    enable(removeAction, this.props.removable);
    enable(deleteAction, this.props.deletable);

    function enable(
      action: DataTableAction<T>,
      value: boolean | DataTableActionType | undefined
    ) {
      value &&
        build({
          ...action,
          type: typeof value === "string" ? value : action.type,
        });
    }

    function build(action: DataTableAction<T>) {
      const type =
        action.type ??
        (action.handleKeys && action.handleItem
          ? "both"
          : action.handleItem
          ? "single"
          : "both");
      const isBoth = type === "both";
      if (isBoth || type === "single") singleActions.push(action);
      if (isBoth || type === "multiple") multipleActions.push(action);
    }
  }

  getOrder(): DataOrder<T>[] {
    return this.columns
      .toSeq()
      .filter(c => c.field && c.sort)
      .map(c => ({
        by: <DataExp<T>>c.field,
        sort: <DataSortType>c.sort,
        nulls: c.sortNulls === "first" ? ("FIRST" as const) : ("LAST" as const),
      }))
      .toArray();
  }
}
