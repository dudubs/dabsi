import { ChildEntity, Column } from "typeorm";
import { StorageFile } from "./StorageFile";

@ChildEntity("image")
export class StorageImage extends StorageFile {
  @Column()
  imageWidth!: number;

  @Column()
  imageHeight!: number;
}
