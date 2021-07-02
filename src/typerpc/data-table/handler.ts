import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { defined } from "@dabsi/common/object/defined";
import { keys } from "@dabsi/common/object/keys";
import { mapObject } from "@dabsi/common/object/mapObject";
import { mapObjectToArray } from "@dabsi/common/object/mapObjectToArray";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { If } from "@dabsi/common/typings2/boolean";
import { Is } from "@dabsi/common/typings2/boolean/Is";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { UndefinedIfEmptyObject } from "@dabsi/common/typings2/UndefinedIfEmptyObject";
import { inspect } from "@dabsi/logging/inspect";
import { RebaseType } from "@dabsi/typedata/BaseType";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { DataOrder } from "@dabsi/typedata/order";
import { DataRow } from "@dabsi/typedata/row";
import { DataSource } from "@dabsi/typedata/source";
import {
  AnyDataTable,
  DataTable,
  DataTableQuery,
  DataTableQueryResult,
  DataTableRow,
} from "@dabsi/typerpc2/data-table/rpc";
import { GenericConfig } from "@dabsi/typerpc2/GenericConfig";
import { RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcError } from "@dabsi/typerpc2/RpcError";
import { WidgetElement } from "@dabsi/typerpc2/widget/Widget";
import {
  WidgetHandler,
  WidgetWithConfig,
} from "@dabsi/typerpc2/widget/WidgetHandler";

const MAX_PAGE_SIZE = 100;

const DEFAULT_PAGE_SIZE = 10;

declare module "./rpc" {
  interface BaseDataTable<T>
    extends WidgetWithConfig<
      DataTable<T>,
      GenericConfig<
        <D>(config: DataTableConfig<T, D>) => DataTableConfig<T, any>
      >
    > {}
}

export declare namespace DataTableColumnConfig {
  type ConfigCanBeUndefined<T, K extends keyof T, D> = K extends keyof D
    ? Is<T[K], D[K]> // TableRow[K] is DataRow[K]
    : K extends keyof RebaseType<D>
    ? Is<T[K], RebaseType<D>[K]>
    : false;

  type Loader<D> = (data: any, row: DataRow<D>) => any;

  // undefined config when column-key is data-field or selection-field. (sortable)
  // loader(data-row)
  // custom

  type CustomConfig<D, Undefined> = PartialUndefinedKeys<
    {
      field: DataExp<D> | Undefined;
    },
    {
      load?: Loader<D>;

      sortable?: boolean;

      order?: {
        by?: DataExp<D>;
        sort?: "ASC" | "DESC";
        nulls?: "FIRST" | "LAST";
      };
    }
  >;

  type Config<
    T,
    K extends keyof T,
    D,
    Undefined extends undefined = If<ConfigCanBeUndefined<T, K, D>, undefined>
  > = CustomConfig<D, Undefined> | ((data: DataRow<D>) => T[K]) | Undefined;

  type ConfigMap<T, D> = UndefinedIfEmptyObject<
    PartialUndefinedKeys<
      {
        [K in keyof T]: Config<T, K, D>;
      }
    >
  >;
}
export type DataTableConfig<T, D> = PartialUndefinedKeys<
  {
    columns: DataTableColumnConfig.ConfigMap<T, D>;
  },
  {
    source: DataSource<D>;

    pageSize?: number;

    maxPageSize?: number;

    searchIn?: DataExp<D>[];

    autoSortables?: boolean;

    isSelectedRow?(row: DataRow<D>): Awaitable<boolean>;
  }
>;

WeakMapFactory((config: DataTableConfig<any, any>) => {});

const getLoader = (
  config: DataTableConfig<any, any>,
  rpcType: RpcType<AnyDataTable>
) => {
  const {
    autoSortables,
    columns: columnConfigMap = {},
    source,
    isSelectedRow,
  } = config;
  const columnTypesMap = DataTable.getColumnTypeMap(rpcType);

  const selection = source.cursor.selection;
  const picked = selection.pick && new Set(selection.pick);

  const fieldMap: Record<string, DataExp<any>> = {};
  const sortableMap: Record<
    string,
    {
      by: DataExp<any>;
      sort: "ASC" | "DESC" | undefined;
      nulls: "FIRST" | "LAST" | undefined;
    }
  > = {};

  const loaders: ((tableRow, dataRow) => void)[] = [];

  const getFieldLoader = (
    columnKey,
    field
  ): ((data: DataRow<any>) => Awaitable<any>) => {
    const isSelectionField = selection.fields?.[field] !== undefined;
    const isPickedField = picked?.has(field);

    if (
      typeof field === "string" &&
      (!picked || isPickedField || isSelectionField)
    ) {
      return data => data[field];
    }

    const fieldKey = "_dt_" + columnKey;
    fieldMap[fieldKey] = field;
    return data => data[fieldKey];
  };

  for (const columnKey of keys(columnTypesMap)) {
    let columnLoader: (data: DataRow<any>) => Awaitable<any>;

    loaders.push(async (tableRow, dataRow) => {
      tableRow[columnKey] = await columnLoader(dataRow);
    });

    const columnConfig: DataTableColumnConfig.Config<any, any, any> = <any>(
      (columnConfigMap[columnKey] || columnKey)
    );

    switch (typeof columnConfig) {
      case "function":
        columnLoader = data => columnConfig(data);
        break;

      case "string":
        columnLoader = getFieldLoader(columnKey, columnConfig);

        if (autoSortables !== false) {
          sortableMap[columnKey] = {
            by: columnKey,
            sort: undefined,
            nulls: undefined,
          };
        }
        break;

      case "object": {
        const {
          load: columnConfigLoader,
          field = columnKey as any,
          sortable,
          order,
        } = columnConfig;
        const fieldLoader = (columnLoader = getFieldLoader(columnKey, field));

        if (sortable !== false) {
          sortableMap[columnKey] = {
            by: order?.by ?? field,
            sort: order?.sort,
            nulls: order?.nulls,
          };
        }

        if (columnConfigLoader) {
          columnLoader = async data =>
            columnConfigLoader(await fieldLoader(data), data);
          break;
        }
        break;
      }
      default:
        throw new RpcError(
          `Unknown column config type "${typeof columnConfig}".`
        );
    }
  }

  return {
    source: source.addFields(fieldMap),
    sortableMap,
    loader: async dataRow => {
      const tableRow: DataTableRow<{}> = { $key: dataRow.$key };
      if (isSelectedRow) {
        tableRow.$selected = await isSelectedRow(dataRow);
      }
      for (const loader of loaders) {
        await loader(tableRow, dataRow);
      }
      return tableRow;
    },
  };
};

export default WidgetHandler(
  AnyDataTable,
  {
    configType: "GENERIC",
    helpers: {
      __loader(): ReturnType<typeof getLoader> {
        return getLoader(this.config, this.rpcType);
      },

      async query(
        query: DataTableQuery<any>
      ): Promise<DataTableQueryResult<any>> {
        const pageSize = Math.min(
          query.pageSize || this.config.pageSize || DEFAULT_PAGE_SIZE,
          this.config.maxPageSize ?? MAX_PAGE_SIZE
        );
        const pageIndex = Math.max(query.pageIndex || 0, 0);

        let { source, loader, sortableMap } = this.get("loader");

        source = source
          //
          .take(pageSize, pageSize * pageIndex)
          .sort(
            mapObjectToArray(
              query.order || {},
              (order, columnKey): DataOrder<any> => {
                const o = defined(
                  sortableMap[columnKey],
                  () => `Column ${columnKey} is not sortable.`
                );
                return {
                  by: o.by,
                  sort: order?.sort,
                  nulls: order?.nulls,
                };
              }
            )
          );

        if (this.config.searchIn?.length && query.text) {
          source = source.filter({
            $or: this.config.searchIn.map(exp => ({
              $search: { in: exp, text: query.text },
            })),
          });
        }

        const [count, rows] = query.count
          ? await source.getCountAndRows()
          : [undefined, await source.getRows()];

        return {
          count,
          pageSize,
          pageIndex,
          rows: await Promise.all(
            //
            rows.toSeq().map(row => loader(row))
          ),
        };
      },
    },
  },
  {
    async getElement(state): Promise<WidgetElement<AnyDataTable>> {
      const queryResult = await this.query(
        state?.query || {
          count: true,
        }
      );

      return {
        ...queryResult,
        sortables: mapObject(
          this.get("loader").sortableMap,
          ({ sort, nulls }) => {
            return { sort, nulls };
          }
        ),
        searchable: Boolean(this.config.searchIn?.length),
        selectable: Boolean(this.config.isSelectedRow),
      };
    },
    handleQuery(query) {
      return this.query(query);
    },
  }
);
