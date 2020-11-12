import { RpcFn } from "../../../../src/typerpc/rpc-fn/RpcFn";
import { RpcMap } from "../../../../src/typerpc/rpc-map/RpcMap";
import { RpcParameter } from "../../../../src/typerpc/rpc-parameter/RpcParameter";

export const TodoListRpc = RpcMap({
  add: RpcFn<(description: string) => number>(),

  get: RpcParameter(
    Number,
    RpcMap({
      delete: RpcFn(),
      update: RpcFn<(description: string) => void>(),
    })
  ),

  getAll: RpcFn<
    () => {
      id: number;
      description: string;
    }[]
  >(),
});
