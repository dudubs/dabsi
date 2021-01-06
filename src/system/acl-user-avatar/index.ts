import StorageModule from "@dabsi/system/storage";
import { Module } from "@dabsi/typedi";

@Module({
  dependencies: [StorageModule],
})
export default class AclUserAvatarModule {}
