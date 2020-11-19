import { RpcFn } from "../../typerpc/rpc-fn/RpcFn";
import { RpcMap } from "../../typerpc/rpc-map/RpcMap";
import { AclGroupsManager } from "./AclGroupsManager";
import { AclUsersManager } from "./AclUsersManager";

export const AdminApp = RpcMap({
  usersManager: AclUsersManager,
  groupsManager: AclGroupsManager,
});
