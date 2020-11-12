import {
  ChildEntity,
  Column,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";
import { DataUnion } from "../../../typedata/DataUnion";
import { Relation } from "../../../typedata/Relation";
import { Group } from "./Group";
import { User } from "./User";

@Entity()
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: Relation<User>;

  @ManyToOne(() => Group)
  group: Relation<User>;
}

export function OwnersColumn() {
  return (
    target: Record<"owners", Relation<Owner>[]>,
    propertyName: "owners"
  ) => {
    Reflect.decorate(
      [ManyToMany(() => Owner) as PropertyDecorator],
      target,
      propertyName
    );
  };
}

export function WithOwners() {
  return (target: Function) => {
    Reflect.decorate(
      [ManyToMany(() => Owner) as PropertyDecorator],
      target.prototype,
      "owners"
    );
  };
}
