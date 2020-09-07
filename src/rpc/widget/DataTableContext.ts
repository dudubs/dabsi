import {entries} from "../../common/object/entries";
import {mapObject} from "../../common/object/mapObject";
import {Lazy} from "../../common/patterns/lazy";
import {DataExp} from "../../data/DataExp";
import {DataOrder} from "../../data/DataOrder";
import {DataRow} from "../../data/DataRow";
import {AbstractWidgetContext} from "./AbstractWidgetContext";
import {DataTable, DataTableQuery, DataTableQueryResult} from "./DataTable";
import {AnyRpc, RpcConfig, RpcError} from "../Rpc";
import {WidgetController, WidgetElement} from "./Widget";

export class DataTableContext<C extends DataTable<any, AnyRpc>>
    extends AbstractWidgetContext<C> {

    @Lazy() get columns() {
        return mapObject(this.config.columns, columnConfig => {
            if (typeof columnConfig === "function") {
                return {load: columnConfig}
            } else {
                return columnConfig
            }
        });
    }

    async getRows(query: DataTableQuery): Promise<DataTableQueryResult<any>> {


        const orders: DataOrder<any>[] = [];

        for (const [key, order] of entries(query.order)) {
            const column = this.columns[key];
            if (column.field === undefined) {
                throw new RpcError(`Can't sort by ${key}`)
            }
            orders.push({
                by: column.field,
                sort: order.sort ?? "ASC",
                nulls: order.nulls
            })
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
                filters.push({$and: searchFilters})
            }
        }
        let source = this.config.source
            .createAsMutable()
            .order(orders)
            .take(Math.min(query.take ?? maxRows, maxRows))
            .skip(query.skip ?? 0);

        if (filters.length) {
            source = source.filter({$and: filters})
        }


        let count: number;
        let dataRows: DataRow<any>[];

        if (query.getCount) {
            [count, dataRows] = await source.countAndQuery();
        } else {
            [count, dataRows] = [0, await source.items()]
        }

        const rows: [string, any][] = [];
        for (const dataRow of dataRows) {
            const row = {};
            rows.push([dataRow.$key, row]);
            for (const [key, column] of entries(this.columns)) {
                row[key] = column.load(dataRow)
            }
        }

        return {rows, count}

    }

    getControllerConfig(): RpcConfig<WidgetController<C>> {
        return $ => $({
            source: this.config.source,
            getTargetConfig: row => this.config.getRowConfig(row)
        })
    }

    async getElement(): Promise<WidgetElement<C>> {
        const {rows, count} = this.props.pageSize ?
            await this.getRows({
                getCount: true,
                text: "",
                take: this.props.pageSize,
                skip: 0,
                order: {}
            }) : {
                rows: [], count: 0
            };

        return {
            rows, count,
            searchable: !!this.config.searchIn?.length,
            columns: mapObject(this.columns, (column) => {
                if (typeof column === "function")
                    return {sortable: false}
                return {sortable: !!column.field}
            })
        }
    }

}
