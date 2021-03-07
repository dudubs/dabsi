import { User } from "@dabsi/system/acl/entities/User";
import { RichTextDocument } from "@dabsi/system/rich-text/entities/Document";
import { DataRelation } from "@dabsi/typedata/relation";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("content/pages")
export class ContentPage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @ManyToOne(() => User)
  owner!: DataRelation<User>;

  @ManyToOne(() => RichTextDocument, { nullable: false })
  content!: DataRelation<RichTextDocument>;
}
