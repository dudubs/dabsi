import {
  ChildEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";
import { DataUnion } from "../../../typedata/DataUnion";
import { Relation } from "../../../typedata/Relation";
import { Group } from "./Group";
import { User } from "./User";

@Entity()
@TableInheritance({
  column: "type",
})
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;
}

@ChildEntity("user")
export class UserOwner extends Owner {
  @ManyToOne(() => User)
  user: Relation<User>;
}

@ChildEntity("user")
export class GroupOwner extends Owner {
  @ManyToOne(() => Group)
  group: Relation<User>;
}

export function OwnerColumn() {
  return (target: Record<"owner", Relation<Owner>>, propertyName: "owner") => {
    Reflect.decorate(
      [ManyToOne(() => Owner) as PropertyDecorator],
      target,
      propertyName
    );
  };
}

export class OwnerData extends DataUnion(Owner, {
  children: {
    USER: UserOwner,
    GROUP: GroupOwner,
  },
} as const) {}
