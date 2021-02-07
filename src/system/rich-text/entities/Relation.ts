import { RichTextDocument } from "@dabsi/system/rich-text/entities/Document";
import { DataRelation } from "@dabsi/typedata/relation";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

type _Relations = {
  [K in keyof IRichText.RelationTypes]: DataRelation<
    IRichText.RelationTypes[K]
  >;
};
export interface RichTextRelation extends _Relations {}

@Entity({ name: "rich-text/rels" })
export class RichTextRelation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;

  @ManyToOne(() => RichTextDocument, doc => doc.relations, {
    onDelete: "CASCADE",
  })
  document!: DataRelation<RichTextDocument>;
}
