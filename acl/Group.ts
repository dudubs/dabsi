import {Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Permission, PermissionColumn} from "./Permission";
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

    @Column()
    title: string;

    @ManyToMany(() => User, user => user.groups)
    @JoinTable()
    users: User[];

    @PermissionColumn()
    permissions: Permission[];

    //
}


{
    ManyToMany(() => Group)(User, "groups");
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

