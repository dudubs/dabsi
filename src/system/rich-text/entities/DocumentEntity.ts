import { Session } from "@dabsi/modules/session/entities/Session";
import { RichTextDocument } from "@dabsi/system/rich-text/entities/Document";
import { DataRelation } from "@dabsi/typedata/relation";
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";

@Entity({ name: "rich-text/entites" })
@TableInheritance({ column: "type" })
export class RichTextEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;

  @ManyToOne(() => Session)
  session!: DataRelation<Session>;

  @ManyToMany(() => RichTextDocument, doc => doc.entities)
  documents!: DataRelation<RichTextDocument>[];
}

// add image -> got entity id ->
