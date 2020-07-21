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
import {Relation} from "../../../data/Relation";
import {TestConnection} from "../../../data/tests/TestConnection";

let randomId = 0;


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
    bOwner?: Relation<BEntity>;

    @OneToOne(() => BEntity, b => b.aOwner)
    b?: Relation<BEntity>;

    @ManyToMany(() => BEntity, b => b.manyBToManyA)
    @JoinTable()
    manyAToManyBOwner?: Relation<BEntity>[];

    @ManyToMany(() => BEntity, b => b.manyBToManyAOwner)
    manyAToManyB?: Relation<BEntity>[];

    @OneToMany(() => BEntity, b => b.manyBToOneA)
    oneAToManyB?: Relation<BEntity>[];

    @ManyToOne(() => BEntity, b => b.oneBToManyA)
    manyAToOneB?: Relation<BEntity>;

    @OneToOne(() => CEntity)
    @JoinColumn()
    cOwner?: Relation<CEntity>;

    @JoinTable()
    @ManyToMany(() => AEntity)
    children: AEntity[]
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
    b_number: number;

    @OneToOne(() => AEntity, a => a.bOwner)
    a?: Relation<AEntity>;

    @OneToOne(() => AEntity, a => a.b)
    @JoinColumn()
    aOwner?: Relation<AEntity>;

    @ManyToMany(() => AEntity, a => a.manyAToManyBOwner)
    manyBToManyA?: Relation<AEntity>[];

    @ManyToMany(() => AEntity, a => a.manyAToManyB)
    @JoinTable()
    manyBToManyAOwner?: Relation<AEntity>[];

    @ManyToOne(() => AEntity, a => a.oneAToManyB)
    manyBToOneA?: Relation<AEntity>;

    @OneToOne(() => AEntity, a => a.manyAToOneB)
    oneBToManyA?: Relation<AEntity>[];

    @OneToOne(() => CEntity, c => c.b)
    @JoinColumn()
    cOwner?: Relation<CEntity>;

    @OneToOne(() => CEntity, c => c.bOwner)
    c?: Relation<CEntity>;
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
    c_text: string;

    @Column({nullable: true})
    c_number: number;

    @OneToOne(() => BEntity, b => b.cOwner)
    b?: Relation<BEntity>;

    @OneToOne(() => BEntity, b => b.c)
    @JoinColumn()
    bOwner?: Relation<BEntity>;
}

