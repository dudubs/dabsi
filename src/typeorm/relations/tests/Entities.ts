import {
    BeforeInsert,
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn
} from "typeorm";
import {TestConnection} from "../../../data/tests/TestConnection";

let randomId = 0;


type Forward<T> = T;


@Entity('A')
export class AEntity {

    @BeforeInsert()
    setNewId() {
        this.a_id = `a${++randomId}`
    }

    @PrimaryColumn()
    a_id: string;

    @Column({nullable: true})
    aText: string;

    @Column({nullable: true})
    aNumber: number;

    @OneToOne(() => BEntity, b => b.a)
    @JoinColumn()
    bOwner: Forward<BEntity>;

    @OneToOne(() => BEntity, b => b.aOwner)
    b: object & BEntity;

    @ManyToMany(() => BEntity, b => b.manyBToManyA)
    @JoinTable()
    manyAToManyBOwner: BEntity[];

    @ManyToMany(() => BEntity, b => b.manyBToManyAOwner)
    manyAToManyB: BEntity[];

    @OneToMany(() => BEntity, b => b.manyBToOneA)
    oneAToManyB: BEntity[];

    @ManyToOne(() => BEntity, b => b.oneBToManyA)
    manyAToOneB: Forward<BEntity>;

    @OneToOne(() => CEntity)
    @JoinColumn()
    cOwner: Forward<CEntity>;
}

@Entity('B')
export class BEntity {

    @BeforeInsert()
    setNewId() {
        this.b_id = `b${++randomId}`
    }

    @PrimaryColumn()
    b_id: string;

    @Column({nullable: true})
    bText: string;

    @Column({nullable: true})
    bNumber: number;

    @OneToOne(() => AEntity, a => a.bOwner)
    a: AEntity;

    @OneToOne(() => AEntity, a => a.b)
    @JoinColumn()
    aOwner: AEntity;

    @ManyToMany(() => AEntity, a => a.manyAToManyBOwner)
    manyBToManyA: AEntity[];

    @ManyToMany(() => AEntity, a => a.manyAToManyB)
    @JoinTable()
    manyBToManyAOwner: AEntity[];

    @ManyToOne(() => AEntity, a => a.oneAToManyB)
    manyBToOneA: AEntity;

    @OneToOne(() => AEntity, a => a.manyAToOneB)
    oneBToManyA: AEntity[];

    @OneToOne(() => CEntity, c => c.b)
    @JoinColumn()
    cOwner: Forward<CEntity>;

    @OneToOne(() => CEntity, c => c.bOwner)
    c: Forward<CEntity>;
}


@Entity('C')
export class CEntity {
    @BeforeInsert()
    setNewId() {
        this.c_id = `c${++randomId}`
    }

    @PrimaryColumn()
    c_id: string;

    @Column({nullable: true})
    cText: string;

    @Column({nullable: true})
    cNumber: number;

    @OneToOne(() => BEntity, b => b.cOwner)
    b: BEntity;

    @OneToOne(() => BEntity, b => b.c)
    @JoinColumn()
    bOwner: BEntity;
}


export const getABCTestConnection = TestConnection([AEntity, BEntity, CEntity]);
