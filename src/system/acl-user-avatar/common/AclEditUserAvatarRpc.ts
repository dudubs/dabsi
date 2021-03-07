import { Typing } from "@dabsi/common/typings2/Typing";
import { RpcFn } from "@dabsi/typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";
import { CustomWidget } from "@dabsi/typerpc/widget/custom/rpc";

export default CustomWidget({
  element: Typing<{
    currentUrl: string | undefined;
    maxSize: number;
    minSize: number;
  }>(),
  controller: RpcMap({
    update: RpcFn<({ field: string }) => { url: string }>(),
  }),
});
