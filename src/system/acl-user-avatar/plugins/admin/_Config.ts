import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
import AclEditUserAvatar from "@dabsi/system/acl-user-avatar/plugins/admin/common/AclEditUserAvatar";
import User from "@dabsi/system/acl/entities/User";
import StorageManager from "@dabsi/system/storage/StorageManager";
import { DataRow } from "@dabsi/typedata/DataRow";

export default RpcConfigResolver(
  AclEditUserAvatar,
  {
    user: DataRow(User),
    rpcReq: RpcRequest,
    sm: StorageManager,
  },
  c => $ =>
    $({
      controllerConfig: {
        async update({ field }) {
          // todo:...
          console.log(c.rpcReq);
        },
      },
      getElement() {
        return { currentUrl: c.user.avatar?.url };
      },
    })
);

// browser/tests
