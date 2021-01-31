import { Resource } from "@dabsi/modules/session/resource";
import { RichTextDocument } from "@dabsi/system/rich-text/entities/Document";
import { DataRelation } from "@dabsi/typedata/relation";
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";

@Entity({ name: "rich-text/entites" })
@TableInheritance({ column: "type" })
export class RichTextEntity extends Resource {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;

  @ManyToMany(() => RichTextDocument, doc => doc.entities)
  documents!: DataRelation<RichTextDocument>[];
}
