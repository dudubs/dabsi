import { Session } from "@dabsi/modules/session/entities/Session";
import { RichTextRelation } from "@dabsi/system/rich-text/entities/Relation";
import { DataRelation } from "@dabsi/typedata/relation";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "rich-text/docs" })
export class RichTextDocument {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Session)
  session!: DataRelation<Session>;

  @Column()
  content!: string;

  @OneToMany(() => RichTextRelation, rel => rel.document)
  relations!: DataRelation<RichTextRelation[]>;
}
