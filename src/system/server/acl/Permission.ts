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
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  type: string;
}

@ChildEntity()
export class UserPermission extends Permission {
  // @ManyToOne(() => User, user => user.permissions)
  // user: Relation<User>;
}

@ChildEntity()
export class GroupPermission extends Permission {
  // @ManyToOne(() => Group, group => group.permissions)
  // group: Relation<Group>;
}

export class PermissionData extends DataUnion(Permission, {
  children: {
    USER: UserPermission,
    GROUP: GroupPermission,
  },
} as const) {}
