import { ManyToOne } from "typeorm";
import { decorateDesignType } from "@dabsi/reflect/decorateDesignType";
import { User } from "@dabsi/system/modules/acl/entities/User";
import { Module } from "@dabsi/typedi";
import { Image } from "@dabsi/system/storage/image/entities/Image";
import ImageStorageModule from "@dabsi/system/storage/image";

declare module "@dabsi/system/modules/acl/entities/User" {
  interface User {
    avatar: Image;
  }
}

decorateDesignType(User, "avatar", Image, [ManyToOne(() => Image)]);

@Module({
  dependencies: [ImageStorageModule],
})
export default class AclUserAvatarModule {}
