import { values } from "@dabsi/common/object/values";
import { entries } from "@dabsi/common/object/entries";
import { mapObject, mapObjectAsync } from "@dabsi/common/object/mapObject";
import Lazy from "@dabsi/common/patterns/lazy";
import { inspect } from "@dabsi/logging/inspect";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { DataOrder } from "@dabsi/typedata/order";
import { DataRow } from "@dabsi/typedata/row";
import { AbstractWidgetHandler } from "@dabsi/typerpc/widget/AbstractWidgetHandler";
import { AnyDataTable } from "@dabsi/typerpc/widget/data-table/DataTable";
import {
  IWidgetHandler,
  WidgetElement,
  WidgetElementState,
} from "@dabsi/typerpc/widget/Widget";
import { AnyDataTableTypes } from "@dabsi/typerpc/widget/data-table/DataTable";

type T = AnyDataTable;

export class DataTableHandler
  extends AbstractWidgetHandler<T>
  implements IWidgetHandler<T> {
  $queryCommand = query => this.query(query);

  @Lazy() get columns() {
    return mapObject(this.rpc.row.fields, (columnType, key, index) => {
      const columnConfig = this.config.columns?.[key];
      let load, field, fieldKey;

      switch (typeof columnConfig) {
        case "function":
          load = columnConfig;
          break;
        case "string":
          field = columnConfig;
          load = dataRow => dataRow[field];
          break;
        case "object":
          ({ load, field } = columnConfig || ({} as any));
          if (typeof load === "function") {
            load = dataRow => dataRow[key];
            field = key;
          } else if (load) {
            field = load;
            fieldKey = "_" + key + "_" + index;
            load = dataRow => dataRow[fieldKey];
          }
          break;
        case "undefined":
          return { field: key, load: dataRow => dataRow[key] };
        default:
          throw new TypeError(`Unexpected ${inspect({ columnConfig })}`);
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
      column.load(dataRow)
    );
    if (!noKey) {
      row.$key = dataRow.$key;
    }
    return row;
  }

  async query(
    query: AnyDataTableTypes["Query"]
  ): Promise<AnyDataTableTypes["QueryResult"]> {
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
      [totalRows, dataRows] = await source.getCountAndRows();
    } else {
      [totalRows, dataRows] = [0, await source.getRows()];
    }
    const rows: any[] = [];
    for (const dataRow of dataRows) {
      rows.push(await this.loadRow(dataRow));
    }

    return { rows, totalRows };
  }

  async getElement(
    state: WidgetElementState<T> | undefined
  ): Promise<WidgetElement<T>> {
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
      searchable: !!this.config.searchIn?.length,
      columns: mapObject(this.columns, column => ({
        sortable: column.field !== undefined,
      })),
    };
  }
}
