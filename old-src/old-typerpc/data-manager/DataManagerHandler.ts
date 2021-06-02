import { ConfigFactory } from "@dabsi/old-typerpc/ConfigFactory";
import { RpcConfigHookHandler } from "@dabsi/old-typerpc/RpcConfigHook";
import { AnyDataManager } from "@dabsi/old-typerpc/data-manager/DataManager";

export const DataManagerHandler: RpcConfigHookHandler<AnyDataManager> = ({
  config,
}) => $ => {
  return $({
    async delete(key) {
      await config.source.delete(key);
    },
    table: $ =>
      $({
        ...config.tableConfig,
        source: config.source,
      }),
    add: {
      inputConfig: config.addInputConfig,
      submit: (value, reject) => config.addSubmit(value, reject),
    },
    edit: async ($, key) => {
      const row = await config.source.getOrFail(key);
      return $(await ConfigFactory(config.editConfigFactory, [row]));
    },
  });
};
