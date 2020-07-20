import {
    ChildEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    TableInheritance
} from "typeorm";
import {DataSelector} from "../DataSelector";
import {DataUnion} from "../DataUnion";
import {Relation} from "../Relation";


export const ModuleFileName = __filename;

@Entity()
@TableInheritance({column: "aType"})
export class ABase {

    @PrimaryGeneratedColumn()
    aId: number;

    @Column()
    aType: string;

    @ManyToOne(() => BBase)
    manyAToOneB?: Relation<BBase>;

    @ManyToMany(() => BBase, b => b.manyBToManyAOwner)
    manyAToManyB?: Relation<BBase>[];

    @ManyToMany(() => BBase, b => b.manyBToManyA)
    @JoinTable()
    manyAToManyBOwner?: Relation<BBase>[];

    @Column({nullable: true})
    aText?: string;


}

@ChildEntity()
export class AChild1 extends ABase {

    @Column({nullable: true})
    aChild1Text?: string;

    @ManyToOne(() => BBase, b => b.oneBToManyA)
    manyAChild1ToOneB?: Relation<BBase>;

    @ManyToMany(() => BBase, b => b.manyBToManyA)
    @JoinTable()
    manyAChild1ToManyBOwner?: Relation<BBase>[];

    @ManyToMany(() => BBase, b => b.manyBToManyAOwner)
    manyAChild1ToManyB?: Relation<BBase>[];
}

@ChildEntity()
export class AChild2 extends ABase {

    @Column({nullable: true})
    aChild2Text?: string;
}

@ChildEntity()
export class AChild1Child1 extends AChild1 {

    @Column({nullable: true})
    aChild1Child1Text?: string;
}

@Entity()
@TableInheritance({column: "bType"})
export class BBase {

    @PrimaryGeneratedColumn()
    bId: number;

    @Column()
    bType: string;

    @Column({nullable: true})
    bText: string;


    @OneToMany(() => ABase, a => a.manyAToOneB)
    oneBToManyA?: Relation<ABase>;

    @ManyToMany(() => ABase, a => a.manyAToManyBOwner)
    manyBToManyA?: Relation<BBase>[];

    @ManyToMany(() => ABase, a => a.manyAToManyB)
    @JoinTable()
    manyBToManyAOwner?: Relation<ABase>[];

    @OneToMany(() => AChild1, aChild1 => aChild1.manyAChild1ToOneB)
    manyBToOneAChild1?: Relation<AChild1>;

    @ManyToMany(() => AChild1, aChild1 => aChild1.manyAChild1ToManyB)
    @JoinTable()
    manyBToManyAChild1Owner?: Relation<AChild1>;

    @ManyToMany(() => AChild1, aChild1 => aChild1.manyAChild1ToManyBOwner)
    manyBToManyAChild1?: Relation<AChild1>;
}

@ChildEntity()
export class BChild1 extends BBase {

    @Column({nullable: true})
    bChild1Text: string;
}

@ChildEntity()
export class BChild2 extends BBase {

    @Column({nullable: true})
    bChild2Text: string;
}

@ChildEntity()
export class BChild1Child1 extends BChild1 {

    @Column({nullable: true})
    bChild1Child1Text: string;
}


export class BUnion extends DataUnion(BBase, "bType", {
    bChild1: BChild1,
    bChild2: BChild2,
    bChild1Child1: BChild1Child1
}) {

}


export class AUnion extends DataUnion(ABase, "aType", {
    aChild1: DataUnion(AChild1, /* Not necessary */"aType", {}, {
        manyAChild1ToOneB: BUnion,
        manyAChild1ToManyBOwner: BUnion,
        manyAChild1ToManyB: BUnion,
    }),
    aChild2: AChild2,
    aChild1Child1: AChild1Child1
}, {
    manyAToOneB: BUnion,
    manyAToManyBOwner: BUnion,
    manyAToManyB: BUnion
}) {
}

/*

    unions:
        aChild1
            relations:
                ma....

    relations:
        unions: ...

 */
