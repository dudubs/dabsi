import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "storage/images",
})
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  countRefs: number;

  @Column()
  url: string;

  @Column()
  width: number;

  @Column()
  height: number;
}
