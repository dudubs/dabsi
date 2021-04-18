import AdminModule from "@dabsi/system/admin/module";
import { Module } from "@dabsi/typedi";

@Module({
  dependencies: [AdminModule],
})
export default class ContentManagementAdminModule {}
