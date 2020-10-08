import {
  BaseEntity,
  ChildEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";
import { Group } from "../../acl/Group";
import { UserEntity } from "../../acl/UserEntity";

@Entity()
@TableInheritance({ column: "type" })
export class TestMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  text: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  from: UserEntity;
}

@ChildEntity()
export class TestPublicMessage extends TestMessage {
  @OneToOne(() => Group)
  @JoinColumn()
  group: Group;
}

@ChildEntity()
export class TestPrivateMessage extends TestMessage {
  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
