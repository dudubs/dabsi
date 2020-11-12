import {
  ChildEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";
import { Relation } from "../../../typedata/Relation";

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
  children: Relation<Menu>[];
}
