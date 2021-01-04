import AclModule from "@dabsi/system/modules/acl";
import "@dabsi/system/modules/acl/plugins/admin/common/AclAdminRpc";
import AdminModule from "@dabsi/system/modules/admin";
import { Module } from "@dabsi/typedi";

@Module({
  dependencies: [AclModule, AdminModule],
})
export default class AclAdminModule {}
