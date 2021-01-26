import { RichTextDocument } from "@dabsi/system/rich-text/entities/Document";
import { DataRelation } from "@dabsi/typedata/relation";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "rich-text/testing",
})
export class RichTextTestEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => RichTextDocument)
  document!: DataRelation<RichTextDocument>;
}
