import {mapObject} from "../common/object/mapObject";
import {Lazy} from "../common/patterns/lazy";
import {DataTable, DataTableQuery, DataTableQueryResult} from "./DataTable";
import {RpcConfig, RpcError} from "./Rpc";
import {AbstractWidgetContext, WidgetController, WidgetElement} from "./Widget";

export class DataTableContext<C extends DataTable<any, any>>
    extends AbstractWidgetContext<C> {

    @Lazy() get columns() {
        return mapObject(this.genericConfig.columns, columnConfig => {
            if (typeof columnConfig === "function") {
                return {load: columnConfig}
            } else {
                return columnConfig
            }
        });
    }

    async getRows(query: DataTableQuery): Promise<DataTableQueryResult<any>> {
        throw new Error()
    }

    getControllerConfig(): RpcConfig<WidgetController<C>> {
        return {
            load: async key => {
                const row = await this.genericConfig.source.get(key);
                if (!row)
                    throw new RpcError(`No source row ${key}`);
                return row;
            },
            target: row => this.genericConfig.getRowConfig(row)
        }
    }

    async getElement(): Promise<WidgetElement<C>> {
        const {rows, count} = this.props.loadOnElement ?
            await this.getRows({
                getCount: true,
                text: "",
                take: 0,
                skip: 0,
                order: {}
            }) : {
                rows: [], count: 0
            };

        return {
            rows, count,
            searchable: !!this.genericConfig.searchIn?.length,
            columns: mapObject(this.columns, (column) => {
                if (typeof column === "function")
                    return {sortable: false}
                return {sortable: !!column.field}
            })
        }
    }

}
