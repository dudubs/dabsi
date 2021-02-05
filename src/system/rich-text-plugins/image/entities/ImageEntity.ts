import { RichTextEntity } from "@dabsi/system/rich-text/entities/DocumentEntity";
import { StorageFile } from "@dabsi/system/storage/entities/StorageFile";
import { DataRelation } from "@dabsi/typedata/relation";
import { ChildEntity, Column, ManyToOne } from "typeorm";

@ChildEntity("image")
export class RichTextImageEntity extends RichTextEntity {
  @ManyToOne(() => StorageFile)
  imageFile!: DataRelation<StorageFile>;

  @ManyToOne(() => StorageFile)
  imagePreviewFile!: DataRelation<StorageFile>;

  @Column()
  imageWidth!: number;

  @Column()
  imageHeight!: number;
}
