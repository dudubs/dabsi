import { entries } from "../../common/object/entries";
import { mapObject } from "../../common/object/mapObject";
import { Lazy } from "../../common/patterns/lazy";
import { DataExp } from "../../data/DataExp";
import { DataOrder } from "../../data/DataOrder";
import { DataRow } from "../../data/DataRow";
import { inspect } from "../../logging";
import { ContextualRpcContext } from "../ContextualRpc";
import { AnyRpc, RpcConfig } from "../Rpc";
import { ConfigFactory, ConfigFactory2 } from "../RpcGenericConfig";
import { AbstractWidgetContext } from "./AbstractWidgetContext";
import {
  AnyDataTableColumnContext,
  DataTable,
  DataTableQuery,
  DataTableQueryResult,
} from "./DataTable";
import { WidgetController, WidgetElement } from "./Widget";

type T = DataTable<any, AnyRpc>;

export class DataTableContext<C extends T>
  extends AbstractWidgetContext<C>
  implements ContextualRpcContext<T> {
  @Lazy() get columns(): Record<string, AnyDataTableColumnContext> {
    return mapObject(this.config.columns || {}, (columnConfig, key) => {
      let load;
      let field: any = undefined;

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
          if (!load) {
            load = dataRow => dataRow[key];
            field = key;
          }
          break;
        default:
          throw new TypeError(`Unexpected ${inspect({ columnConfig })}`);
      }

      return { load, field };
    });
  }

  async getTableRowFromDataRow(dataRow: DataRow<any>) {
    const row = { $key: dataRow.$key };
    for (const [key, column] of entries(this.columns)) {
      row[key] = await column.load(dataRow);
    }
    return row;
  }

  async getRows(
    query: DataTableQuery<any>
  ): Promise<DataTableQueryResult<any>> {
    const orders: DataOrder<any>[] = [];

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
    let source = this.config.source
      .createAsMutable()
      .order(orders)
      .take(Math.min(query.take ?? maxRows, maxRows))
      .skip(query.skip ?? 0)
      .filter({ $and: filters });

    let totalRows: number;
    let dataRows: DataRow<any>[];

    if (query.getCount) {
      [totalRows, dataRows] = await source.countAndQuery();
    } else {
      [totalRows, dataRows] = [0, await source.items()];
    }

    const rows: any[] = [];
    for (const dataRow of dataRows) {
      rows.push(await this.getTableRowFromDataRow(dataRow));
    }

    return { rows, totalRows };
  }

  getControllerConfig(): RpcConfig<WidgetController<C>> {
    return $ =>
      $({
        load: String,
        getTargetConfig: ($, key) =>
          $(ConfigFactory(this.config.getRowConfig, { key })),
      });
  }

  async getElement(): Promise<WidgetElement<C>> {
    const { rows, totalRows } = await this.getRows({
      getCount: true,
      text: "",
      take: this.config.pageSize || 10,
      skip: 0,
      order: {},
    });

    return {
      rows,
      totalRows,
      pageSize: this.config.pageSize,
      searchable: !!this.config.searchIn?.length,
      columns: mapObject(this.columns, column => {
        if (typeof column === "function") return { sortable: false };
        return { sortable: !!column.field };
      }),
    };
  }
}
