import { AclRpc } from "@dabsi/system/acl/common/rpc";

export default () => {
  AclRpc.instance.logout();
};
