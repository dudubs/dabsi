import { Typing } from "@dabsi/common/typings2/Typing";
import AclEditUser from "@dabsi/system/acl/plugins/admin/users/common/AclEditUser";
import { RpcFn } from "@dabsi/typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";
import { CustomWidget } from "@dabsi/typerpc/widget/custom-widget/CustomWidget";

export default AclEditUser.registerDefault(
  "avatar",
  CustomWidget({
    element: Typing<{
      currentUrl: string | undefined;
    }>(),
    controller: RpcMap({
      update: RpcFn<({ field: string }) => void>(),
    }),
  })
);
