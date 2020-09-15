import {entries} from "../../common/object/entries";
import {mapObject} from "../../common/object/mapObject";
import {Lazy} from "../../common/patterns/lazy";
import {DataExp} from "../../data/DataExp";
import {DataOrder} from "../../data/DataOrder";
import {DataRow} from "../../data/DataRow";
import {inspect} from "../../logging";
import {ContextualRpcContext} from "../ContextualRpc";
import {AbstractWidgetContext} from "./AbstractWidgetContext";
import {DataTable, DataTableColumnContext, DataTableQuery, DataTableQueryResult} from "./DataTable";
import {AnyRpc, RpcConfig, RpcError} from "../Rpc";
import {WidgetController, WidgetElement} from "./Widget";

type T = DataTable<any, AnyRpc>;


export class DataTableContext<C extends T>
    extends AbstractWidgetContext<C>
    implements ContextualRpcContext<T> {

    @Lazy() get columns(): Record<string, DataTableColumnContext<any, any, any>> {
        return mapObject(this.config.columns, (columnConfig, key) => {
            if (typeof columnConfig === "function") {
                return {load: columnConfig}
            } else {
                return columnConfig || {
                    load(row) {
                        return row[key]
                    }
                }
            }
        });
    }

    async getRowFromDataRow(dataRow: DataRow<any>) {
        const row = {$key: dataRow.$key};
        for (const [key, column] of entries(this.columns)) {
            row[key] = await column.load(dataRow)
        }
        return row;
    }

    async getRows(query: DataTableQuery<any>): Promise<DataTableQueryResult<any>> {


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
                })
            } else {

                orders.push({
                    by: column.field,
                    sort: order.sort ?? "ASC",
                    nulls: order.nulls
                })
            }

        }

        const maxRows = this.config.maxRows ?? 10;
        const filters: DataExp<any> = [];

        if (query.text) {

            const searchFilters = this.config.searchIn?.map(field => {
                return {
                    $search: {
                        in: field,
                        text: query.text
                    }
                }
            })
            if (searchFilters?.length) {
                filters.push({$or: searchFilters})
            }
        }
        let source = this.config.source
            .createAsMutable()
            .order(orders)
            .take(Math.min(query.take ?? maxRows, maxRows))
            .skip(query.skip ?? 0)
            .filter({$and: filters});


        let count: number;
        let dataRows: DataRow<any>[];

        if (query.getCount) {
            [count, dataRows] = await source.countAndQuery();
        } else {
            [count, dataRows] = [0, await source.items()]
        }

        const rows: any[] = [];
        for (const dataRow of dataRows) {
            rows.push(await this.getRowFromDataRow(dataRow));
        }

        return {rows, count}

    }

    getControllerConfig(): RpcConfig<WidgetController<C>> {
        return $ => $({
            source: this.config.source,
            getTargetConfig: ($, row) => this.config.getRowConfig?.(row)
        })
    }

    async getElement(): Promise<WidgetElement<C>> {
        const {rows, count} = this.config.pageSize ?
            await this.getRows({
                getCount: true,
                text: "",
                take: this.config.pageSize,
                skip: 0,
                order: {}
            }) : {
                rows: [], count: 0
            };

        return {
            rows, count,
            pageSize: this.config.pageSize,
            searchable: !!this.config.searchIn?.length,
            columns: mapObject(this.columns, (column) => {
                if (typeof column === "function")
                    return {sortable: false}
                return {sortable: !!column.field}
            })
        }
    }

}
