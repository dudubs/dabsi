import { Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DataRelation } from "@dabsi/typedata/DataRelation";
import { Group } from "@dabsi/system/acl/entities/AclGroup";
import { User } from "@dabsi/system/acl/entities/AclUser";

@Entity()
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: DataRelation<User>;

  @ManyToOne(() => Group)
  group: DataRelation<User>;
}

export function OwnersColumn() {
  return (
    target: Record<"owners", DataRelation<Owner>[]>,
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
