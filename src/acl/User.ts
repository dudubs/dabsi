import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    firstName?: string;

    @Column({nullable: true})
    lastName?: string;

    @Column({nullable: true})
    loginName?: string;

    @Column({nullable: true})
    email?: string;

    @Column({nullable: true})
    phoneNumber?: string;

    get fullName():string {
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

