import StorageModule from "@dabsi/system/storage/module";
import { Module } from "@dabsi/typedi";

@Module({
  dependencies: [StorageModule],
})
export default class AclAdminUserAvatarModule {
  avatarMaxSize = 120;

  avatarMinSize = 120;
}
