import {BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Group} from "./Group";


@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    firstName?: string;

    @Column({nullable: true})
    lastName?: string;

    @Column({nullable:true})
    loginName: string;


    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }

    set fullName(fullName: string) {
        const index = fullName.indexOf(" ");
        if (0 > index) {
            this.firstName = fullName;
            this.lastName = undefined;

        } else {
            this.firstName = fullName.substring(0, index).trim();
            this.lastName = fullName.substring(index + 1).trim();
        }
    }
}

