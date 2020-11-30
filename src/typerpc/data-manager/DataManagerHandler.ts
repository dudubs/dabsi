import { ConfigFactory } from "../ConfigFactory";
import { RpcConfigHookHandler } from "../RpcConfigHook";
import { AnyDataManager } from "./DataManager";

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
      submit: config.addSubmit,
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
                async submit(value) {
                  await config.editSubmit(row, value);
                },

                /// tabsConfig
              }),
          });
        },
      });
    },
  });
};
