import {BaseEntity, Column, Entity, ManyToOne, OneToMany, OneToOne} from "typeorm";
import {User} from "./User";

declare module "./User" {
    interface User {
        friends: UserFriend[];
    }
}

@Entity()
export class UserFriend extends BaseEntity {

    @ManyToOne(() => User, user => user.friends)
    user: User;

    @OneToOne(() => User)
    friend: User;

    @Column()
    blocked: boolean;
}

{
    OneToMany(() => UserFriend, uf => uf.user)(User);
}
