import { AnyDataManager } from "./DataManager";
import { RpcConfiguratorFactory } from "./RpcConfigurator";
import { ConfigFactory } from "./RpcGenericConfig";

export const DataManagerHandler = RpcConfiguratorFactory<AnyDataManager>(
  ($, config, tm) =>
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
                    .getConfigForValue(config.getValueFromDataRow(row)),
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
