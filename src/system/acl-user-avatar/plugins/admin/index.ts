import AclUserAvatarModule from "@dabsi/system/acl-user-avatar";
import AclAdminModule from "@dabsi/system/acl/plugins/admin";
import { AclAdminUserSelection } from "@dabsi/system/acl/plugins/admin/users/server/_ManagerConfig";
import { Module } from "@dabsi/typedi";

import "./common/AclAdminEditUserAvatarRpc";

@Module({
  dependencies: [AclUserAvatarModule, AclAdminModule],
})
export default class AclUserAvatarAdmin {
  constructor() {
    AclAdminUserSelection.relations = {
      ...AclAdminUserSelection.relations,
      avatar: {
        pick: ["url"],
      },
    };
  }
}
