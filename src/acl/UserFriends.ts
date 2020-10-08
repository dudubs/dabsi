import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { UserEntity } from "./UserEntity";

declare module "./UserEntity" {
  interface UserEntity {
    friends: UserFriend[];
  }
}

@Entity()
export class UserFriend {
  @ManyToOne(() => UserEntity, user => user.friends)
  user: UserEntity;

  @OneToOne(() => UserEntity)
  friend: UserEntity;

  @Column()
  blocked: boolean;
}

{
  OneToMany(
    () => UserFriend,
    uf => uf.user
  )(UserEntity);
}
