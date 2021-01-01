import AclModule from "@dabsi/system/acl";
import "@dabsi/system/acl/plugins/admin/common/AclAdminRpc";
import AdminModule from "@dabsi/system/admin";
import { Module } from "@dabsi/typedi";

@Module({
  dependencies: [AclModule, AdminModule],
})
export default class AclAdminModule {}
