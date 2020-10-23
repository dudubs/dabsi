import { ConfigFactory } from "../ConfigFactory";
import { AnyDataManager } from "./DataManager";
import { RpcConfiguratorHandler } from "../old/RpcConfigurator";

export const DataManagerHandler = RpcConfiguratorFactory.Generic<
  AnyDataManager
>(($, config, tm) =>
  $({
    async delete(key) {
      await config.source.delete(key);
    },
    Table: $ =>
      $({
        ...config.tableConfig,
        source: config.source,
      }),
    Add: {
      inputConfig: config.addInputConfig,
      submit: value => {
        return config.addSubmit(value);
      },
    },
    Edit: $ =>
      $({
        source: config.source,
        getTargetConfig: ($, row) => {
          return $({
            getElement() {
              return { title: config.getTitle(row) };
            },
            targetConfig: {
              Form: {
                inputConfig: tm.props.editInput
                  .getContext(config.editInputConfig)
                  .then(c =>
                    c.getConfigForValue(config.getValueFromDataRow(row))
                  ),
                submit(value) {
                  return config.editSubmit(row, value);
                },
              },
              ...ConfigFactory(config.getTabsConfig, row),
            },
          });
        },
      }),
  })
);
