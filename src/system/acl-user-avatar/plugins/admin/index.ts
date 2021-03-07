import AclAdminUserAvatarModule from "@dabsi/system/acl-user-avatar";
import AclAdminModule from "@dabsi/system/acl/plugins/admin";
import { AclAdminUserSelection } from "@dabsi/system/acl/plugins/admin/users/server/_managerConfig";
import { Module } from "@dabsi/typedi";

import "./common/AclAdminEditUserAvatarRpc";

@Module({
  dependencies: [AclAdminUserAvatarModule, AclAdminModule],
})
export default class AclAdminUserAvatarAdmin {
  constructor() {
    AclAdminUserSelection.relations = {
      ...AclAdminUserSelection.relations,
      avatar: {
        pick: ["url"],
      },
    };
  }
}
