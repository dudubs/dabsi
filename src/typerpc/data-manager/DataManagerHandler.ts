import { RpcConfigHookHandler } from "../RpcConfigHook";
import { AnyDataManager } from "./DataManager";

export const DataManagerHandler: RpcConfigHookHandler<AnyDataManager> = ({
  config,
  props: { editInput },
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
      submit: value => {
        return config.addSubmit(value);
      },
    },
    edit: async ($, key) => {
      const row = await config.source.getOrFail(key);
      return $({
        getElement() {
          return { title: config.getTitle(row) };
        },
        targetConfig: {
          form: { inputConfig: config.editInputConfig },
          submit(value) {
            return config.editSubmit(row, value);
          },
        },
      });
    },
  });
};
