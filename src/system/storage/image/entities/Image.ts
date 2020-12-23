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

  @Column({ nullable: true }) // ~120x120
  iconUrl: string;

  @Column({ nullable: true }) // ~64x64
  thumUrl: string;

  @Column()
  width: number;

  @Column()
  height: number;
}
