import { ACL_AdminRouter } from "@dabsi/system/acl/admin/view/router";
import { RouterView } from "@dabsi/typerouter2/view/RouterView";

RouterView.define(ACL_AdminRouter, {
  groups: () => <>hello groups</>,
  editGroup: () => <>edit group</>,
});
