import { RichTextEntity } from "@dabsi/system/rich-text/entities/DocumentEntity";
import { StorageFile } from "@dabsi/system/storage/entities/StorageFile";
import { DataRelation } from "@dabsi/typedata/DataRelation";
import { ChildEntity, Column, ManyToOne } from "typeorm";

@ChildEntity("image")
export class RichTextImageEntity extends RichTextEntity {
  @ManyToOne(() => StorageFile)
  file!: DataRelation<StorageFile>;

  @ManyToOne(() => StorageFile)
  previewFile!: DataRelation<StorageFile>;

  @Column()
  width!: number;

  @Column()
  height!: number;
}
