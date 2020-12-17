import { OldAnyDataTable, DataTableOld } from "@dabsi/typedata/old/DataTable/DataTable";

declare module "./DataTable" {
  interface DataTable<T, Props> {
    toggleSort: typeof toggleSort;
  }
}

// DataTableOld.prototype.toggleSort = toggleSort;

function toggleSort(this: OldAnyDataTable, columnIndex: number) {
  this.sort = undefined;
  this.columns = this.columns.map((column, index) => {
    if (index === columnIndex) {
      return {
        ...column,
        sort:
          column.sort === "ASC"
            ? "DESC"
            : column.sort === "DESC"
            ? undefined
            : "ASC",
      };
    } else {
      return this.props.multiSort ? column : { ...column, sort: undefined };
    }
  });
}
