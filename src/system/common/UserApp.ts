import { RpcFn } from "../../typerpc/rpc-fn/RpcFn";
import { RpcMap } from "../../typerpc/rpc-map/RpcMap";

export const UserApp = RpcMap({
  foo: RpcFn(),
});
