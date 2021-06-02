import { DataRelation } from "@dabsi/typedata/relation";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("content/categories")
export class ContentCategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @ManyToOne(() => ContentCategory, c => c.children)
  parent!: DataRelation<ContentCategory>;

  @OneToMany(() => ContentCategory, c => c.parent)
  children!: DataRelation<ContentCategory>[];
}
