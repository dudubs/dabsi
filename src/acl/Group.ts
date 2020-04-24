import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Ref} from "../react/utils/Ref";
import {User} from "./User";


@Entity()
export class Group {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToMany(() => User, user => user.groups)
    @JoinTable()
    users: User[];


}


/*

    get relation between $user to $user? friend|blocked|nobody

    get access to $object for $user: root|owner|friend|blocked|guest

    setObjectAccess($object, $toUser, "owner"
    getObjectOwner
    addOwner($object, $user)
    replaceOwner()
    getRootOwner




 */

