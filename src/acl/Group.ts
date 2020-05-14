import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {decorateDesignType} from "../reflect/decorateDesignType";
import {User} from "./User";


declare module "./User" {
    interface User {

        groups: Group[];

    }
}


@Entity()
export class Group {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    name?: string;

    // TODO: Maybe optional?
    @ManyToMany(() => User, user => user.groups)
    @JoinTable()
    users: User[];


}


decorateDesignType(User, "groups", Array, [
    ManyToMany(() => Group, group => group.users)
]);
