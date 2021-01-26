import {
  BeforeInsert,
  ChildEntity,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";
import { TestRelation } from "@dabsi/typeorm/relations/tests/TestRelation";
import { DataRelation } from "@dabsi/typedata/relation";
import { DataUnion } from "@dabsi/typedata/union";

let randomId = 0;

@Entity()
@TableInheritance({ column: "dType" })
export class DEntity {
  @BeforeInsert()
  setNewId() {
    this.dId = `${this.constructor.name}_${++randomId}`;
  }

  @PrimaryColumn()
  dId!: string;

  @Column()
  dType?: string;

  @Column({ nullable: true })
  dText?: string;

  @Column({ nullable: true })
  dNumber?: number;

  @Column({ nullable: true })
  dBoolean?: boolean;

  @TestRelation(() => EEntity)
  oneDToOneE?: DataRelation<EEntity>;

  @TestRelation(() => EEntity)
  oneDToOneEOwner?: DataRelation<EEntity>;

  @TestRelation(() => EEntity)
  oneDToManyE!: DataRelation<EEntity>[];

  @TestRelation(() => EEntity)
  manyDToOneE?: DataRelation<EEntity>;

  @TestRelation(() => EEntity)
  manyDToManyE!: DataRelation<EEntity>[];

  @TestRelation(() => EEntity)
  manyDToManyEOwner!: DataRelation<EEntity>[];
}

@ChildEntity()
export class DChild1 extends DEntity {
  @Column({ nullable: true })
  dChild1Text?: string;

  @Column({ nullable: true })
  dChild1Text2?: string;

  @TestRelation(() => EEntity)
  manyDChild1ToOneE?: DataRelation<EEntity>;

  @TestRelation(() => EEntity)
  manyDChild1ToManyEOwner!: DataRelation<EEntity>[];

  @TestRelation(() => EEntity)
  manyDChild1ToManyE!: DataRelation<EEntity>[];

  @TestRelation(() => EEntity)
  oneDChild1ToOneEOwner?: DataRelation<EEntity>;

  @TestRelation(() => EEntity)
  oneDChild1ToOneE?: DataRelation<EEntity>;

  @TestRelation(() => EEntity)
  oneDChild1ToManyE!: DataRelation<EEntity>[];
}

@ChildEntity()
export class DChild2 extends DEntity {
  @Column({ nullable: true })
  dChild2Text?: string;
}

@ChildEntity()
export class DChild3 extends DEntity {
  @Column({ nullable: true })
  dChild3Text?: string;
}

@ChildEntity()
export class DChild1Child1 extends DChild1 {
  @Column({ nullable: true })
  dChild1Child1Text?: string;
}

@ChildEntity()
export class DChild1Child2 extends DChild1 {
  @Column({ nullable: true })
  dChild1Child2Text?: string;
}

@Entity()
@TableInheritance({ column: "eType" })
export class EEntity {
  @PrimaryGeneratedColumn()
  eId!: number;

  @Column()
  eType!: string;

  @Column({ nullable: true })
  eText?: string;

  @Column({ nullable: true })
  eText2?: string;

  @TestRelation(() => DEntity)
  oneEToOneDOwner?: DataRelation<DEntity>;

  @TestRelation(() => DEntity)
  oneEToOneD?: DataRelation<DEntity>;

  @TestRelation(() => DEntity)
  manyEToOneD?: DataRelation<DEntity>;

  @TestRelation(() => DEntity)
  oneEToManyD!: DataRelation<DEntity>[];

  @TestRelation(() => DEntity)
  manyEToManyDOwner!: DataRelation<DEntity>[];

  @TestRelation(() => DEntity)
  manyEToManyD!: DataRelation<DEntity>[];

  @TestRelation(() => DChild1)
  manyEToOneDChild1?: DataRelation<DChild1>;

  @TestRelation(() => DChild1)
  manyEToManyDChild1Owner!: DataRelation<DChild1>[];

  @TestRelation(() => DChild1)
  manyEToManyDChild1!: DataRelation<DChild1>[];

  @TestRelation(() => DChild1)
  oneEToManyDChild1!: DataRelation<DChild1>[];

  @TestRelation(() => DChild1)
  oneEToOneDChild1?: DataRelation<DChild1>;

  @TestRelation(() => DChild1)
  oneEToOneDChild1Owner?: DataRelation<DChild1>;
}

@ChildEntity()
export class EChild1 extends EEntity {
  @Column({ nullable: true })
  eChild1Text!: string;
}

@ChildEntity()
export class EChild2 extends EEntity {
  @Column({ nullable: true })
  eChild2Text!: string;
}

@ChildEntity()
export class EChild1Child1 extends EChild1 {
  @Column({ nullable: true })
  eChild1Child1Text!: string;
}

export class EUnion extends DataUnion(EEntity, {
  children: {
    eChild1: EChild1,
    eChild2: EChild2,
    eChild1Child1: EChild1Child1,
  },
}) {}

export class DUnion extends DataUnion(DEntity, {
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
