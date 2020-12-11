import { ConfigFactory } from "../ConfigFactory";
import { RpcConfigHookHandler } from "../RpcConfigHook";
import { AnyDataManager2 } from "./DataManager2";

export const DataManagerHandler2: RpcConfigHookHandler<AnyDataManager2> = ({
  config,
}) => $ => {
  return $({
    async delete(key) {
      await config.source.delete(key);
    },
    table: $ =>
      $({
        ...config.tableConfig,
        columns: config.tableColumns,
        source: config.source,
      }),
    add: {
      inputConfig: config.addInputConfig,
      submit: (value, reject) => config.addSubmit(value, reject),
    },
    edit: async ($, key) => {
      const row = await config.source.getOrFail(key);
      return $(await ConfigFactory(config.editConfigFactory, row));
    },
  });
};
