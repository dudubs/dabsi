import { AnyDataParameter } from "./DataParameter";
import {
  RpcConfiguratorFactory,
  RpcConfiguratorFactory2,
} from "./RpcConfigurator";

export const DataParameterHandler = RpcConfiguratorFactory<AnyDataParameter>(
  ($, config) =>
    $($ =>
      $({
        load(data) {
          return config.source.getOrFail(data);
        },
        getTargetConfig: config.getTargetConfig,
      })
    )
);

export const DataParameterHandler2 = RpcConfiguratorFactory2<AnyDataParameter>(
  ($, config) =>
    $($ =>
      $({
        load(data) {
          return config.source.getOrFail(data);
        },
        getTargetConfig: config.getTargetConfig,
      })
    )
);
