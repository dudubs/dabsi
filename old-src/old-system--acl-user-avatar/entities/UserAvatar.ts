import { decorateDesignType } from "@dabsi/reflect/decorateDesignType";
import { User } from "@dabsi/system/uac/entities/User";
import { StorageFile } from "@dabsi/system/storage/entities/StorageFile";
import { DataRelation } from "@dabsi/typedata/relation";
import { ManyToOne } from "typeorm";

declare module "@dabsi/system/uac/entities/User" {
  interface User {
    avatar: DataRelation<StorageFile>;
  }
}

decorateDesignType(User, "avatar", StorageFile, [ManyToOne(() => StorageFile)]);
