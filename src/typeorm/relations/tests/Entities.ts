import "reflect-metadata";
import {BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryColumn} from "typeorm";
import {Relation} from "../../../data/Relation";
import {TestRelation} from "./TestRelation";

let randomId = 0;


@Entity('A')
export class AEntity {

    @BeforeInsert()
    setNewId() {
        this.aId = `a${++randomId}`
    }

    @PrimaryColumn()
    aId: string;

    @Column({nullable: true})
    aText: string;

    @Column({nullable: true})
    aNumber: number;

    // to B
    @TestRelation(() => BEntity)
    oneAToOneB: Relation<BEntity>;

    @TestRelation(() => BEntity)
    oneAToOneBOwner: Relation<BEntity>;

    @TestRelation(() => BEntity)
    oneAToManyB: Relation<BEntity>[];

    @TestRelation(() => BEntity)
    manyAToOneB: Relation<BEntity>;

    @TestRelation(() => BEntity)
    manyAToManyB: Relation<BEntity>[];

    @TestRelation(() => BEntity)
    manyAToManyBOwner: Relation<BEntity>[];

    @TestRelation(() => CEntity)
    oneAToOneC: Relation<CEntity>;

    @TestRelation(() => CEntity)
    oneAToOneCOwner: Relation<CEntity>;

    @TestRelation(() => CEntity)
    manyAToManyC: Relation<CEntity>[];

    @TestRelation(() => CEntity)
    manyAToManyCOwner: Relation<CEntity>[];

    @TestRelation(() => AEntity, {
        joinTable: {
            joinColumn: {
                name:"aOwnerId",
                // referencedColumnName: "xxx"
            },
            inverseJoinColumn:{
                name:"aChildId",
                // referencedColumnName:"xxx4"
            }
        }
    })
    manyAToManyAOwner: Relation<AEntity>[];

    @TestRelation(() => AEntity)
    manyAToManyA: Relation<AEntity>[];

}

@Entity('B')
export class BEntity {

    @BeforeInsert()
    setNewId() {
        this.bId = `b${++randomId}`
    }

    @PrimaryColumn()
    bId: string;

    @Column({nullable: true})
    bText: string;

    @Column({nullable: true})
    bNumber: number;

    @TestRelation(() => AEntity)
    oneBToOneA: Relation<AEntity>;

    @TestRelation(() => AEntity)
    oneBToOneAOwner: Relation<AEntity>;

    @TestRelation(() => AEntity)
    oneBToManyA: Relation<AEntity>[];

    @TestRelation(() => AEntity)
    manyBToOneA: Relation<AEntity>;

    @TestRelation(() => AEntity)
    manyBToManyAOwner: Relation<AEntity>[];

    @TestRelation(() => AEntity)
    manyBToManyA: Relation<AEntity>[];


    @TestRelation(() => CEntity)
    oneBToOneC: Relation<CEntity>;

    @TestRelation(() => CEntity)
    oneBToOneCOwner: Relation<CEntity>;

    @TestRelation(() => CEntity)
    manyBToManyCOwner: Relation<CEntity>[];

    @TestRelation(() => CEntity)
    manyBToManyC: Relation<CEntity>[];
}


@Entity('C')
export class CEntity {
    @BeforeInsert()
    setNewId() {
        this.cId = `c${++randomId}`
    }

    @PrimaryColumn()
    cId: string;

    @Column({nullable: true})
    cText: string;

    @Column({nullable: true})
    cNumber: number;

    @TestRelation(() => BEntity)
    oneCToOneB: Relation<BEntity>;

    @TestRelation(() => BEntity)
    oneCToOneBOwner: Relation<BEntity>;

    @TestRelation(() => AEntity)
    oneCToOneA: Relation<AEntity>;

    @TestRelation(() => AEntity)
    oneCToOneAOwner: Relation<AEntity>;

    @TestRelation(() => AEntity)
    manyCToManyAOwner: Relation<AEntity>[];

    @TestRelation(() => AEntity)
    manyCToManyA: Relation<AEntity>[];

    @TestRelation(() => BEntity)
    manyCToManyBOwner: Relation<BEntity>[];

    @TestRelation(() => BEntity)
    manyCToManyB: Relation<BEntity>[];

}

