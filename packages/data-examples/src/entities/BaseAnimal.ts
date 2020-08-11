import {Column, Entity, PrimaryGeneratedColumn, TableInheritance} from "typeorm/index";

@Entity()
@TableInheritance({column: "type"})
export class BaseAnimal {

    @Column()
    type: string;

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}
