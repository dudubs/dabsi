import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "storage/files" })
export class StorageFile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  countRefs!: number;

  @Column()
  url!: string;

  @Column()
  time!: number;
}
