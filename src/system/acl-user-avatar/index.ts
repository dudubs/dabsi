import StorageModule from "@dabsi/system/storage";
import { Module } from "@dabsi/typedi";

@Module({
  dependencies: [StorageModule],
})
export default class AclAdminUserAvatarModule {
  avatarMaxSize = 120;

  avatarMinSize = 120;
}
