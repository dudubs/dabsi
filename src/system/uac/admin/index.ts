import "@dabsi/system/uac/admin/common/UacRpc";
import UacModule from "@dabsi/system/uac";
import { AdminModule } from "@dabsi/system/admin";
import { Module } from "@dabsi/typemodule";

@Module({
  dependencies: [UacModule, AdminModule],
})
export default class UacAdminModule {}
