import { ConfigFactory } from "../ConfigFactory";
import { RpcConfigHookHandler } from "../RpcConfigHook";
import { AnyDataManager } from "./DataManager";
import { Rejectable } from "./Rejectable";

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
        columns: config.tableColumnsConfig,
        source: config.source,
      }),
    add: {
      inputConfig: config.addInputConfig,
      submit: (value, reject) => config.addSubmit(value, reject),
    },
    edit: async ($, key) => {
      const row = await config.source.getOrFail(key);
      return $({
        getExtraElement() {
          return { title: config.getTitleForRow(row) };
        },
        targetConfig: async $ => {
          return $({
            ...(await ConfigFactory(config.getTabsConfigForRow, row)),
            form: async $ =>
              $({
                inputConfig: await ConfigFactory(
                  config.editInputConfigForRow,
                  row
                ), //
                valueConfig:
                  config.editValueConfigForRow &&
                  (() => ConfigFactory(config.editValueConfigForRow, row)),
                submit(value, reject) {
                  return config.editSubmit([row, value], reject);
                },

                /// tabsConfig
              }),
          });
        },
      });
    },
  });
};
