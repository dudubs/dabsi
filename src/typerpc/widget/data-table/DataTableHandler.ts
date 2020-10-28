import { AbstractWidgetHandler } from "../AbstractWidgetHandler";
import { entries } from "../../../common/object/entries";
import { mapObject } from "../../../common/object/mapObject";
import { Lazy } from "../../../common/patterns/lazy";
import { RequireOptionalKeys } from "../../../common/typings";
import { DataExp } from "../../../data/DataExp";
import { DataOrder } from "../../../data/DataOrder";
import { DataRow } from "../../../data/DataRow";
import { inspect } from "../../../logging";
import { ConfigFactory } from "../../ConfigFactory";
import { RpcUnresolvedConfig } from "../../Rpc";
import { IWidgetHandler, WidgetController, WidgetElement } from "../Widget";
import { AnyDataTable, DataTableTypes, TDataTable } from "./DataTable";

type R = AnyDataTable;
type T = TDataTable;

export class DataTableHandler
  extends AbstractWidgetHandler<R>
  implements IWidgetHandler<R> {
  @Lazy() get columns() {
    return mapObject(this.config.columns || {}, (columnConfig, key) => {
      let load, field;

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

      return {
        load,
        field,
      };
    });
  }

  async loadRow(dataRow, noKey?: boolean) {
    const row: any = {};
    if (!noKey) {
      row.$key = dataRow.$key;
    }
    for (const [key, column] of entries(this.columns)) {
      row[key] = await column.load(dataRow);
    }
    return row;
  }

  async getRows(
    query: DataTableTypes<T>["Query"]
  ): Promise<DataTableTypes<T>["QueryResult"]> {
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

  getControllerConfig(): RpcUnresolvedConfig<WidgetController<R>> {
    return {
      getRowController: async ($, key) =>
        $(
          await ConfigFactory(this.config.getRowControllerConfig, {
            key,
            source: this.config.source,
          })
        ),
      getRows: query => this.getRows(query),
    };
  }

  async getElement(): Promise<RequireOptionalKeys<WidgetElement<R>>> {
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
      columns: {},
    };
  }
}
