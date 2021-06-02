import { Typing } from "@dabsi/common/typings2/Typing";
import { RpcFn } from "@dabsi/old-typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/old-typerpc/rpc-map/RpcMap";
import { CustomWidget } from "@dabsi/old-typerpc/widget/custom/rpc";

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
