import {
    BeforeInsert,
    ChildEntity,
    Column,
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    TableInheritance
} from "typeorm";
import {TestRelation} from "../../typeorm/relations/tests/TestRelation";
import {DataUnion} from "../DataUnion";
import {Relation} from "../Relation";


let randomId = 0;

@Entity()
@TableInheritance({column: "dType"})
export class DBase {

    @BeforeInsert()
    setNewId() {
        this.dId = `${this.constructor.name}_${++randomId}`
    }

    @PrimaryColumn()
    dId: string;

    @Column()
    dType: string;

    @Column({nullable: true})
    dText?: string;

    @Column({nullable: true})
    dNumber?: number;

    @TestRelation(() => EBase)
    oneDToOneE?: Relation<EBase>;

    @TestRelation(() => EBase)
    oneDToOneEOwner?: Relation<EBase>;

    @TestRelation(() => EBase)
    oneDToManyE?: Relation<EBase>[];

    @TestRelation(() => EBase)
    manyDToOneE?: Relation<EBase>;

    @TestRelation(() => EBase)
    manyDToManyE?: Relation<EBase>[];

    @TestRelation(() => EBase)
    manyDToManyEOwner?: Relation<EBase>[];


}

@ChildEntity()
export class DChild1 extends DBase {

    @Column({nullable: true})
    dChild1Text?: string;

    @Column({nullable: true})
    dChild1Text2?: string;

    @TestRelation(() => EBase)
    manyDChild1ToOneE?: Relation<EBase>;

    @TestRelation(() => EBase)
    manyDChild1ToManyEOwner?: Relation<EBase>[];

    @TestRelation(() => EBase)
    manyDChild1ToManyE?: Relation<EBase>[];

    @TestRelation(() => EBase)
    oneDChild1ToOneEOwner?: Relation<EBase>;

    @TestRelation(() => EBase)
    oneDChild1ToOneE?: Relation<EBase>;

    @TestRelation(() => EBase)
    oneDChild1ToManyE?: Relation<EBase>[];
}

@ChildEntity()
export class DChild2 extends DBase {

    @Column({nullable: true})
    dChild2Text?: string;
}

@ChildEntity()
export class DChild1Child1 extends DChild1 {

    @Column({nullable: true})
    dChild1Child1Text?: string;
}

@Entity()
@TableInheritance({column: "eType"})
export class EBase {

    @PrimaryGeneratedColumn()
    eId: number;

    @Column()
    eType: string;

    @Column({nullable: true})
    eText: string;

    @TestRelation(() => DBase)
    oneEToOneDOwner?: Relation<DBase>;

    @TestRelation(() => DBase)
    oneEToOneD?: Relation<DBase>;

    @TestRelation(() => DBase)
    manyEToOneD?: Relation<DBase>;

    @TestRelation(() => DBase)
    oneEToManyD?: Relation<DBase>[];

    @TestRelation(() => DBase)
    manyEToManyDOwner?: Relation<DBase>[];

    @TestRelation(() => DBase)
    manyEToManyD?: Relation<DBase>[];


    @TestRelation(() => DChild1)
    manyEToOneDChild1?: Relation<DChild1>;

    @TestRelation(() => DChild1)
    manyEToManyDChild1Owner?: Relation<DChild1>[];

    @TestRelation(() => DChild1)
    manyEToManyDChild1?: Relation<DChild1>[];

    @TestRelation(() => DChild1)
    oneEToManyDChild1?: Relation<DChild1>[];


    @TestRelation(() => DChild1)
    oneEToOneDChild1?: Relation<DChild1>;

    @TestRelation(() => DChild1)
    oneEToOneDChild1Owner?: Relation<DChild1>;


}

@ChildEntity()
export class EChild1 extends EBase {

    @Column({nullable: true})
    eChild1Text: string;

}

@ChildEntity()
export class EChild2 extends EBase {

    @Column({nullable: true})
    eChild2Text: string;
}

@ChildEntity()
export class EChild1Child1 extends EChild1 {

    @Column({nullable: true})
    eChild1Child1Text: string;
}


export class EUnion extends DataUnion(EBase, "eType", {
    eChild1: EChild1,
    eChild2: EChild2,
    eChild1Child1: EChild1Child1
}) {

}


export class DUnion extends DataUnion(DBase, "dType", {
    dChild1: DataUnion(DChild1, {
        manyDChild1ToOneE: EUnion,
        manyDChild1ToManyE: EUnion,
        manyDChild1ToOneEOwner: EUnion,
        manyDChild1ToManyEOwner: EUnion,
    }),
    dChild2: DChild2,
    dChild1Child1: DChild1Child1
}, {
    oneDToOneE: EUnion,
    manyDToManyE: EUnion,

    // oneDToOneEOwner: EUnion,
    // manyDToManyEOwner: EUnion,


    oneDToManyE: EUnion,
    manyDToOneE: EUnion,
}) {
}

/*

    unions:
        dChild1
            relations:
                ma....

    relations:
        unions: ...

 */
