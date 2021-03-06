import { IfUndefined } from "@dabsi/common/typings2/boolean";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { UndefinedIfEmptyObject } from "@dabsi/common/typings2/UndefinedIfEmptyObject";
import { DataForm } from "@dabsi/modules/data/common/DataForm";
import DataContext from "@dabsi/modules/data/DataContext";

import { RpcBoundResolver, RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
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
import {
  ConfigFactory,
  ConfigOrFactory,
  GenericConfig,
} from "@dabsi/typerpc/GenericConfig";
import {
  AnyInputWithConfig,
  InputValue,
  InputValueConfig,
} from "@dabsi/typerpc/input/InputHandler";
import { RpcLocation } from "@dabsi/typerpc/RpcLocation";
import { RpcTypeOrLocation } from "@dabsi/typerpc/RpcTypeOrLocation";

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
): RpcBoundResolver<DataForm<T>>;

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
      data: DataContext,
    },
    c => async $ => {
      const config =
        (await GenericConfig(
          c.configFactory as ConfigFactory<DataFormConfig<any, any, any>>
        )) || {};

      const row = c.data.getParameter(rowType);

      return $({
        inputConfig: c.inputConfig,
        valueConfig: async $ =>
          $(
            await ConfigOrFactory(config.valueConfig, async () => [
              await row.select(config.selection || {}),
            ])
          ),
        async submit(value) {
          type RowConfig = ConfigFactory<any, [any]>;

          const commitRow = Object.assign(
            {},
            ...(await Promise.all([
              GenericConfig(config.commitConfig as RowConfig, [value]),
              row.$key
                ? GenericConfig(config.updateConfig as RowConfig, [value])
                : GenericConfig(config.insertConfig as RowConfig, [value]),
            ]))
          );

          if (row.$key) {
            await row.update(commitRow);
            return row.$key;
          }

          return c.data.getSource(rowType).insert(commitRow);
        },
      });
    }
  );
}

export default DataFormResolver;
