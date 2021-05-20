import { IfUndefined } from "@dabsi/common/typings2/boolean";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { UndefinedIfEmptyObject } from "@dabsi/common/typings2/UndefinedIfEmptyObject";
import { DataRowContext } from "@dabsi/modules/data/DataRowContext";
import {
  RpcResolver,
  RpcResolverFactory,
} from "@dabsi/modules/rpc/RpcResolver";
import { DataSourceFactory2 } from "@dabsi/modules2/DataSourceFactory2";
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
  ConsumeFactory,
  ResolverDeps,
} from "@dabsi/typedi/consume";
import { InputValueConfig } from "@dabsi/typerpc/input/Input";
import { DataForm } from "@dabsi/typerpc2/data-form/rpc";
import {
  ConfigFactory,
  ConfigOrFactory,
  GenericConfig2,
} from "@dabsi/typerpc2/GenericConfig";
import { AnyInput } from "@dabsi/typerpc2/input/Input";
import { InputValue } from "@dabsi/typerpc2/input/InputHandler";
import { RpcType } from "@dabsi/typerpc2/Rpc";

export type DataFormConfig<
  Input extends AnyInput,
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

    debug(iv: InputValue<Input>);

    updatable?: boolean;

    insertable?: boolean;

    insertConfig?: ConfigFactory<DataInsertRow<Data>, [InputValue<Input>]>;

    updateConfig?: ConfigFactory<DataUpdateRow<Data>, [InputValue<Input>]>;

    commitConfig?: ConfigFactory<DataCommitRow<Data>, [InputValue<Input>]>;
  }
>;
export declare function DataFormResolver2<
  T extends AnyInput,
  U extends ResolverDeps,
  Data,
  Selection extends DataSelection<Data>,
  C = DataFormConfig<T, Data, Selection>
>(
  rowType: Constructor<Data>,
  ...args: ConsumeArgs<ConfigFactory<C> | UndefinedIfEmptyObject<C>, U>
): RpcResolverFactory<DataForm<T>>;

export default function DataFormResolver<
  U extends ResolverDeps,
  Input extends AnyInput,
  Data,
  Selection extends DataSelection<Data> = {},
  C = DataFormConfig<Input, Data, Selection>
>(
  inputType: RpcType<Input>,
  rowType: Constructor<Data>,

  ...args: ConsumeArgs<
    Resolver<ConfigFactory<C>> | UndefinedIfEmptyObject<C> | undefined,
    U
  >
): RpcResolver<DataForm<Input>>;

export default function DataFormResolver(
  inputType: RpcType<AnyInput>,
  rowType: Constructor,
  config: Resolver<DataFormConfig<AnyInput, any, {}>>
): RpcResolver<DataForm<AnyInput>> {
  return <any>RpcResolver(
    DataForm(inputType),
    {
      config,
      inputConfig: RpcResolver(inputType),
      row: DataRowContext(rowType),
      getSource: DataSourceFactory2,
    },
    c => $ =>
      $({
        inputConfig: c.inputConfig,
        valueConfig: async $ =>
          $(
            await ConfigOrFactory(c.config.valueConfig, () => [
              c.row.fetch(c.config.selection || {}),
            ])
          ),
        async submit(value) {
          type RowConfig = ConfigFactory<any, [any]>;

          const commitRow = Object.assign(
            {},
            ...(await Promise.all([
              GenericConfig2(c.config.commitConfig as RowConfig, [value]),
              c.row.$key
                ? GenericConfig2(c.config.updateConfig as RowConfig, [value])
                : GenericConfig2(c.config.insertConfig as RowConfig, [value]),
            ]))
          );

          if (c.row.$key) {
            await c.row.update(commitRow);
            return c.row.$key;
          }

          return c.getSource(rowType).insertKey(commitRow);
        },
      })
  );
}
