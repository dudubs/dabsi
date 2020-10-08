import { AnyParameter } from "./Parameter";
import { ConfigFactory } from "./RpcGenericConfig";
import { RpcHandlerFactory } from "./RpcHandlerFactory";

export const ParameterHandler = RpcHandlerFactory.Generic<AnyParameter>(
  function (config) {
    return async ([data, payload]) => {
      const value = await config.load(data);
      const targetConfig = ConfigFactory(config.getTargetConfig, value);
      const targetHandler = this.target.createRpcHandler(targetConfig);
      return targetHandler(payload);
    };
  }
);
