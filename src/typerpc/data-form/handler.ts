import { IfUndefined } from "@dabsi/common/typings2/boolean";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { DataRowContext } from "@dabsi/modules/data/DataRowContext";
import RpcConfigFactoryResolver from "@dabsi/modules/rpc/configFactoryResolver";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { DataSourceFactory2 } from "@dabsi/modules2/DataSourceFactory2";
import { DataRow } from "@dabsi/typedata/row";
import { DataSelectionRow } from "@dabsi/typedata/selection/row";
import { DataSelection } from "@dabsi/typedata/selection/selection";
import {
  DataCommitRow,
  DataInsertRow,
  DataUpdateRow,
} from "@dabsi/typedata/value";
import { ResolvedMap, Resolver, ResolverMap } from "@dabsi/typedi";
import {
  ConfigFactory,
  ConfigOrFactory,
} from "@dabsi/old-typerpc/ConfigFactory";
import { DataForm } from "@dabsi/old-typerpc/data-form/rpc";
import {
  AnyInput,
  InputValue,
  InputValueConfig,
} from "@dabsi/old-typerpc/input/Input";
import { RpcError } from "@dabsi/old-typerpc/RpcError";

export type DataFormConfig<
  Input extends AnyInput,
  Data,
  Selection extends DataSelection<Data>
> = PartialUndefinedKeys<
  {
    valueConfig:
      | ConfigOrFactory<
          InputValueConfig<Input>,
          [row: DataRow<DataSelectionRow<Data, Selection>> | null]
        >
      | IfUndefined<InputValueConfig<Input>, undefined>;
  },
  {
    selection?: Selection;

    inserttable?: boolean;

    noUpdate?: boolean;

    insertConfig?: ConfigFactory<DataInsertRow<Data>, [InputValue<Input>]>;

    updateConfig?: ConfigFactory<DataUpdateRow<Data>, [InputValue<Input>]>;

    commitConfig?: ConfigFactory<DataCommitRow<Data>, [InputValue<Input>]>;
  }
>;
export function DataFormConfigResolver<
  Input extends AnyInput,
  Data,
  ConfigContext extends ResolverMap,
  Selection extends DataSelection<Data> = {}
>(
  input: Input,
  rowType: Constructor<Data>,
  configContext: ConfigContext,
  getConfigFactory: (
    context: ResolvedMap<ConfigContext>
  ) => ConfigFactory<
    //
    DataFormConfig<Input, Data, Selection>
  >
) {
  return <any>RpcResolver(
    DataForm(input as AnyInput),
    {
      createInputConfig: RpcConfigFactoryResolver(input as AnyInput),
      row: DataRowContext(rowType),
      getDataSource: DataSourceFactory2,
      configContext: Resolver.object(configContext || {}),
    },
    c => async $ => {
      const config: DataFormConfig<any, any, any> = await ConfigFactory(
        getConfigFactory(c.configContext)
      );

      if (c.row.$key) {
        if (config.noUpdate) {
          throw new RpcError(`No config for insert.`);
        }
      } else {
        if (!config.inserttable) {
          throw new RpcError(`No config for insert.`);
        }
      }

      return $({
        inputConfig: c.createInputConfig(),

        valueConfig: async $ =>
          $(
            await ConfigOrFactory(config.valueConfig, [
              await c.row.fetch(config.selection || {}),
            ])
          ),
        async submit(value) {
          const source = c.getDataSource(rowType);

          const commitRow = Object.assign(
            {},
            ...(await Promise.all([
              ConfigFactory(config.commitConfig, [value]),
              c.row.$key
                ? ConfigFactory(config.updateConfig, [value])
                : ConfigFactory(config.insertConfig, [value]),
            ]))
          );

          if (c.row.$key) {
            await c.row.update(commitRow);
            return c.row.$key;
          }
          return source.insertKey(commitRow);
        },
      });
    }
  );
}
