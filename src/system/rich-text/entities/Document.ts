import Session from "@dabsi/modules/session/entities/Session";
import { RichTextEntity } from "@dabsi/system/rich-text/entities/DocumentEntity";
import { DataRelation } from "@dabsi/typedata/DataRelation";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "rich-text/docs" })
export class RichTextDocument {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  countRefs!: number;

  @ManyToOne(() => Session)
  session!: DataRelation<Session>;

  @Column()
  text!: string;

  @Column()
  data!: string;

  @JoinTable()
  @ManyToMany(() => RichTextEntity, entity => entity.documents)
  entities!: DataRelation<RichTextEntity>[];
}
