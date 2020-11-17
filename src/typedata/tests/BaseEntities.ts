import {
  BeforeInsert,
  ChildEntity,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";
import { TestRelation } from "../../typeorm/relations/tests/TestRelation";
import { DataRelation } from "../DataRelation";
import { DataUnion } from "../DataUnion";

let randomId = 0;

// TODO: rename to DBase -> DEntity, EBase -> EEntity
@Entity()
@TableInheritance({ column: "dType" })
export class DBase {
  @BeforeInsert()
  setNewId() {
    this.dId = `${this.constructor.name}_${++randomId}`;
  }

  @PrimaryColumn()
  dId: string;

  @Column()
  dType?: string;

  @Column({ nullable: true })
  dText?: string;

  @Column({ nullable: true })
  dNumber?: number;

  @Column({ nullable: true })
  dBoolean?: boolean;

  @TestRelation(() => EBase)
  oneDToOneE?: DataRelation<EBase>;

  @TestRelation(() => EBase)
  oneDToOneEOwner?: DataRelation<EBase>;

  @TestRelation(() => EBase)
  oneDToManyE: DataRelation<EBase>[];

  @TestRelation(() => EBase)
  manyDToOneE?: DataRelation<EBase>;

  @TestRelation(() => EBase)
  manyDToManyE: DataRelation<EBase>[];

  @TestRelation(() => EBase)
  manyDToManyEOwner: DataRelation<EBase>[];
}

@ChildEntity()
export class DChild1 extends DBase {
  @Column({ nullable: true })
  dChild1Text?: string;

  @Column({ nullable: true })
  dChild1Text2?: string;

  @TestRelation(() => EBase)
  manyDChild1ToOneE?: DataRelation<EBase>;

  @TestRelation(() => EBase)
  manyDChild1ToManyEOwner: DataRelation<EBase>[];

  @TestRelation(() => EBase)
  manyDChild1ToManyE: DataRelation<EBase>[];

  @TestRelation(() => EBase)
  oneDChild1ToOneEOwner?: DataRelation<EBase>;

  @TestRelation(() => EBase)
  oneDChild1ToOneE?: DataRelation<EBase>;

  @TestRelation(() => EBase)
  oneDChild1ToManyE: DataRelation<EBase>[];
}

@ChildEntity()
export class DChild2 extends DBase {
  @Column({ nullable: true })
  dChild2Text?: string;
}

@ChildEntity()
export class DChild1Child1 extends DChild1 {
  @Column({ nullable: true })
  dChild1Child1Text?: string;
}

@Entity()
@TableInheritance({ column: "eType" })
export class EBase {
  @PrimaryGeneratedColumn()
  eId: number;

  @Column()
  eType: string;

  @Column({ nullable: true })
  eText?: string;

  @Column({ nullable: true })
  eText2?: string;

  @TestRelation(() => DBase)
  oneEToOneDOwner?: DataRelation<DBase>;

  @TestRelation(() => DBase)
  oneEToOneD?: DataRelation<DBase>;

  @TestRelation(() => DBase)
  manyEToOneD?: DataRelation<DBase>;

  @TestRelation(() => DBase)
  oneEToManyD: DataRelation<DBase>[];

  @TestRelation(() => DBase)
  manyEToManyDOwner: DataRelation<DBase>[];

  @TestRelation(() => DBase)
  manyEToManyD: DataRelation<DBase>[];

  @TestRelation(() => DChild1)
  manyEToOneDChild1?: DataRelation<DChild1>;

  @TestRelation(() => DChild1)
  manyEToManyDChild1Owner: DataRelation<DChild1>[];

  @TestRelation(() => DChild1)
  manyEToManyDChild1: DataRelation<DChild1>[];

  @TestRelation(() => DChild1)
  oneEToManyDChild1: DataRelation<DChild1>[];

  @TestRelation(() => DChild1)
  oneEToOneDChild1?: DataRelation<DChild1>;

  @TestRelation(() => DChild1)
  oneEToOneDChild1Owner?: DataRelation<DChild1>;
}

@ChildEntity()
export class EChild1 extends EBase {
  @Column({ nullable: true })
  eChild1Text: string;
}

@ChildEntity()
export class EChild2 extends EBase {
  @Column({ nullable: true })
  eChild2Text: string;
}

@ChildEntity()
export class EChild1Child1 extends EChild1 {
  @Column({ nullable: true })
  eChild1Child1Text: string;
}

export class EUnion extends DataUnion(EBase, {
  children: {
    eChild1: EChild1,
    eChild2: EChild2,
    eChild1Child1: EChild1Child1,
  },
}) {}

export class DUnion extends DataUnion(DBase, {
  relations: {
    oneDToOneE: EUnion,
    manyDToManyE: EUnion,
    oneDToManyE: EUnion,
    manyDToOneE: EUnion,
  },
  children: {
    dChild1: DataUnion(DChild1, {
      relations: {
        manyDChild1ToOneE: EUnion,
        manyDChild1ToManyE: EUnion,
        manyDChild1ToOneEOwner: EUnion,
        manyDChild1ToManyEOwner: EUnion,
      },
    }),
    dChild2: DChild2,
    dChild1Child1: DChild1Child1,
  },
}) {}

/*

    children:
        dChild1
            relations:
                ma....

    relations:
        children: ...

 */
