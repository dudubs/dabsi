import { ChildEntity, Column } from "typeorm";
import { StorageFile } from "./file";

@ChildEntity("image")
export class ImageFile extends StorageFile {
  @Column()
  imageWidth!: number;

  @Column()
  imageHeight!: number;
}
