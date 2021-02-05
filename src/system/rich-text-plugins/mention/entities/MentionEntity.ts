import { User } from "@dabsi/system/acl/entities/User";
import { RichTextEntity } from "@dabsi/system/rich-text/entities/DocumentEntity";
import { DataRelation } from "@dabsi/typedata/relation";
import { ChildEntity, ManyToOne } from "typeorm";

@ChildEntity("mention")
export class RichTextMontionEntity extends RichTextEntity {
  @ManyToOne(() => User) user!: DataRelation<User>;
}

/*

  type:montion user: 
*/
