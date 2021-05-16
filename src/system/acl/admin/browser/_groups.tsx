import ACL_AdminRpc from "@dabsi/system/acl/admin/common/rpc";
import { ACL_AdminRouter } from "@dabsi/system/acl/admin/view/router";
import { RouterView } from "@dabsi/typerouter2/view/RouterView";

RouterView.define(ACL_AdminRouter, {
  groups: () => {
    return <>hello groups33x</>;
  },
  editGroup: () => <>edit group</>,
});
