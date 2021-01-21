import User from "@dabsi/system/acl/entities/User";
import { RichTextEntity } from "@dabsi/system/rich-text/entities/DocumentEntity";
import { DataRelation } from "@dabsi/typedata/DataRelation";
import { ChildEntity, ManyToOne } from "typeorm";

@ChildEntity("mention")
export class RichTextImageEntity extends RichTextEntity {
  @ManyToOne(() => User) user!: DataRelation<User>;
}
