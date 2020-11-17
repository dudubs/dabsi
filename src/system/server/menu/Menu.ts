import {
  ChildEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";
import { DataRelation } from "../../../typedata/DataRelation";

@Entity("menu")
@TableInheritance({ column: "type" })
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;
}

@ChildEntity("link")
export class MenuLink extends Menu {
  @Column()
  title: string;

  @Column()
  href: string;
}

@ChildEntity("link")
export class MenuCategory extends Menu {
  @Column()
  title: string;

  @JoinTable()
  @ManyToMany(() => Menu)
  children: DataRelation<Menu>[];
}
