import { IfUndefined } from "@dabsi/common/typings2/boolean";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { UndefinedIfEmptyObject } from "@dabsi/common/typings2/UndefinedIfEmptyObject";
import { inspect } from "@dabsi/logging/inspect";
import { DataForm } from "@dabsi/modules/data/common/DataForm";
import { DataRowContext } from "@dabsi/modules/data/DataRowContext";
import { DataSourceFactory2 } from "@dabsi/modules/DbModule";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { DataRow } from "@dabsi/typedata/row";
import { DataSelectionRow } from "@dabsi/typedata/selection/row";
import { DataSelection } from "@dabsi/typedata/selection/selection";
import {
  DataCommitRow,
  DataInsertRow,
  DataUpdateRow,
} from "@dabsi/typedata/value";
import { Resolver } from "@dabsi/typedi";
import {
  ConsumeArgs,
  ConsumeOptionalArgs,
  ResolverDeps,
} from "@dabsi/typedi/consume";
import { RpcType } from "@dabsi/typerpc2";
import {
  ConfigFactory,
  ConfigOrFactory,
  GenericConfig,
} from "@dabsi/typerpc2/GenericConfig";
import {
  AnyInputWithConfig,
  InputValue,
  InputValueConfig,
} from "@dabsi/typerpc2/input/InputHandler";
import { RpcLocation } from "@dabsi/typerpc2/RpcLocation";
import { RpcTypeOrLocation } from "@dabsi/typerpc2/RpcTypeOrLocation";

export type DataFormConfig<
  Input extends AnyInputWithConfig,
  Data,
  Selection extends DataSelection<Data>
> = PartialUndefinedKeys<
  {
    valueConfig:
      | IfUndefined<InputValueConfig<Input>, undefined>
      | ConfigOrFactory<
          InputValueConfig<Input>,
          [row: DataRow<DataSelectionRow<Data, Selection>>]
        >;
  },
  {
    selection?: Selection;

    updatable?: boolean;

    insertable?: boolean;

    insertConfig?: ConfigFactory<DataInsertRow<Data>, [InputValue<Input>]>;

    updateConfig?: ConfigFactory<DataUpdateRow<Data>, [InputValue<Input>]>;

    commitConfig?: ConfigFactory<DataCommitRow<Data>, [InputValue<Input>]>;
  }
>;
export function DataFormResolver<
  T extends AnyInputWithConfig,
  U extends ResolverDeps,
  Data,
  Selection extends DataSelection<Data>,
  C = DataFormConfig<T, Data, Selection>
>(
  rpcType: RpcTypeOrLocation<DataForm<T>>,
  rowType: Constructor<Data>,
  ...args: ConsumeOptionalArgs<ConfigFactory<C> | UndefinedIfEmptyObject<C>, U>
): RpcResolver<DataForm<T>>;

export function DataFormResolver(rpcTypeOrLocation, rowType, ...args) {
  const configFactoryResolver: Resolver<
    undefined | ConfigFactory<DataFormConfig<any, any, any>>
  > =
    ConsumeArgs(args as ConsumeArgs<ConfigFactory<any>, any>) ||
    (() => undefined);

  return RpcResolver(
    rpcTypeOrLocation as RpcLocation<DataForm<any>>,
    {
      //
      configFactory: configFactoryResolver,
      inputConfig: RpcResolver(rpcTypeOrLocation.at("input")),
      row: DataRowContext(rowType),
      rowKey: DataRowContext.Key(rowType),
      getSource: DataSourceFactory2,
    },
    c => async $ => {
      const config =
        (await GenericConfig(
          c.configFactory as ConfigFactory<DataFormConfig<any, any, any>>
        )) || {};

      return $({
        inputConfig: c.inputConfig,
        valueConfig: async $ =>
          $(
            await ConfigOrFactory(config.valueConfig, async () => [
              await c.row.fetch(config.selection || {}),
            ])
          ),
        async submit(value) {
          type RowConfig = ConfigFactory<any, [any]>;

          const commitRow = Object.assign(
            {},
            ...(await Promise.all([
              GenericConfig(config.commitConfig as RowConfig, [value]),
              c.row.$key
                ? GenericConfig(config.updateConfig as RowConfig, [value])
                : GenericConfig(config.insertConfig as RowConfig, [value]),
            ]))
          );

          if (c.row.$key) {
            await c.row.update(commitRow);
            return c.row.$key;
          }

          return c.getSource(rowType).insertKey(commitRow);
        },
      });
    }
  );
}

export default DataFormResolver;
