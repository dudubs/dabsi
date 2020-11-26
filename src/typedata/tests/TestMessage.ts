import {
  ChildEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";
import { Group } from "../../system-old/server/acl/Group";
import { User } from "../../system-old/server/acl/User";

@Entity()
@TableInheritance({ column: "type" })
export class TestMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  text: string;

  @OneToOne(() => User)
  @JoinColumn()
  from: User;
}

@ChildEntity()
export class TestPublicMessage extends TestMessage {
  @OneToOne(() => Group)
  @JoinColumn()
  group: Group;
}

@ChildEntity()
export class TestPrivateMessage extends TestMessage {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
