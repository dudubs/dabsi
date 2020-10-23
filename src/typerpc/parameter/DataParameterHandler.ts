import { RpcError } from "../Rpc";
import { RpcConfigHookHandler } from "../RpcConfigHook";
import { AnyDataParameter } from "./DataParameter";

export const DataParameterHandler: RpcConfigHookHandler<AnyDataParameter> = config => $ =>
  $({
    load(key) {
      if (!key) throw new RpcError(`Expected to key`);
      return config.source.getOrFail(key);
    },
    getTargetConfig: config.getTargetConfig,
  });
