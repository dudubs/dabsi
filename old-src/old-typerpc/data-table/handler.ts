import { entries } from "@dabsi/common/object/entries";
import { mapObject, mapObjectAsync } from "@dabsi/common/object/mapObject";
import { values } from "@dabsi/common/object/values";
import Lazy from "@dabsi/common/patterns/Lazy";
import { inspect } from "@dabsi/logging/inspect";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { DataOrder } from "@dabsi/typedata/order";
import { DataRow } from "@dabsi/typedata/row";
import { AbstractWidgetHandler } from "@dabsi/old-typerpc/widget/AbstractWidgetHandler";
import { AnyDataTable, DataTable } from "@dabsi/old-typerpc/data-table/rpc";
import {
  IWidgetHandler,
  WidgetElement,
  WidgetElementState,
} from "@dabsi/old-typerpc/widget/Widget";
import { RequireOptionalKeys } from "@dabsi/common/typings2/RequireOptionalKeys";

type T = AnyDataTable;

export class DataTableHandler
  extends AbstractWidgetHandler<T>
  implements IWidgetHandler<T> {
  $queryCommand = query => this.query(query);

  @Lazy() get columns() {
    const selection = this.config.source.cursor.selection;

    const picked = selection.pick && new Set(selection.pick);

    return mapObject(this.rpc.row, (columnType, columnKey, index) => {
      const columnConfig = this.config.columns?.[columnKey];
      let load, field, fieldKey;

      function loadAsIs() {
        if (
          selection.pick &&
          selection.fields?.[columnKey] === undefined &&
          !picked?.has(columnKey)
        ) {
          field = { $base: columnConfig };
          fieldKey = "_base_" + columnKey;
        } else {
          field = columnKey;
          fieldKey = columnKey;
        }
        load = data => data;
      }

      switch (typeof columnConfig) {
        case "function":
          load = columnConfig;
          break;
        case "string":
          loadAsIs();
          break;
        case "object":
          ({ load, field: field } = columnConfig || ({} as any));

          fieldKey = "_" + columnKey + "_" + index;

          if (!load) {
            load = data => data;
          }

          break;
        case "undefined":
          loadAsIs();
          break;
        default:
          throw new TypeError(`Unexpected ${inspect({ columnConfig })}`);
      }

      if (!load) {
        throw new Error(`no column loader for "${columnKey}".`);
      }

      return {
        load,
        field,
        fieldKey,
      };
    });
  }

  async loadRow(dataRow, noKey?: boolean) {
    const row: any = await mapObjectAsync(this.columns, column =>
      column.load(dataRow[column.fieldKey], dataRow)
    );

    const {
      config: { loadIsChecked },
    } = this;
    if (!noKey) {
      row.$key = dataRow.$key;
      if (loadIsChecked) {
        row.$checked = await loadIsChecked(dataRow);
      }
    }
    return row;
  }

  async query(
    query: DataTable.Query<any>
  ): Promise<DataTable.QueryResult<any>> {
    const orders: DataOrder<any>[] = [];
    const fields = {};

    for (const column of values(this.columns)) {
      if (column.fieldKey) {
        fields[column.fieldKey] = column.field;
      }
    }
    for (const [key, order] of entries(query.order)) {
      const column = this.columns[key];
      if (column.field === undefined) {
        continue;
      }

      if (typeof order === "string") {
        orders.push({
          by: column.field,
          sort: order,
        });
      } else {
        orders.push({
          by: column.field,
          sort: order.sort ?? "ASC",
          nulls: order.nulls,
        });
      }
    }

    const maxRows = this.config.maxRows ?? 10;
    const filters: DataExp<any> = [];

    if (query.text) {
      const searchFilters = this.config.searchIn?.map(field => {
        return {
          $search: {
            in: field,
            text: query.text,
          },
        };
      });
      if (searchFilters?.length) {
        filters.push({ $or: searchFilters });
      }
    }

    const pageSize = Math.max(1, Math.min(query.pageSize ?? maxRows, maxRows));
    let source = this.config.source
      .sort(orders)
      .take(pageSize)
      .skip(pageSize * (query.pageIndex || 0))
      .addFields(fields)
      .filter({ $and: filters });

    let totalRows: number;
    let dataRows: DataRow<any>[];

    if (query.getCount) {
      [totalRows, dataRows] = await source.countAndFetch();
    } else {
      [totalRows, dataRows] = [0, await source.fetchAll()];
    }
    const rows: any[] = [];
    for (const dataRow of dataRows) {
      rows.push(await this.loadRow(dataRow));
    }

    return { rows, totalRows };
  }

  async getElement(
    state: WidgetElementState<T> | undefined
  ): Promise<RequireOptionalKeys<WidgetElement<T>>> {
    const { rows, totalRows } = await this.query({
      getCount: true,
      text: "",
      pageSize: this.config.pageSize || 10,
      pageIndex: 0,
      order: {},
      ...state?.query,
    });
    return {
      rows,
      totalRows,
      pageSize: this.config.pageSize,
      searchable: !!this.config.searchIn?.length || undefined,
      columns: mapObject(this.columns, column => ({
        sortable: column.field !== undefined || undefined,
      })),
      checkable: this.config.loadIsChecked ? true : undefined,
    };
  }
}
