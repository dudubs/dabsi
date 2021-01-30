import "reflect-metadata";
import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";
import { DataRelation } from "@dabsi/typedata/relation";
import { TestRelation } from "@dabsi/typeorm/relations/tests/TestRelation";
import TestIdColumn from "@dabsi/typedata/entity/tests/TestIdColumn";

let randomId = 0;

// DataEntity()

@Entity("A")
export class AEntity {
  @TestIdColumn()
  aId!: string;

  @Column({ nullable: true })
  aText?: string;

  @Column({ nullable: true })
  aNumber?: number;

  // to B
  @TestRelation(() => BEntity)
  oneAToOneB?: DataRelation<BEntity>;

  @TestRelation(() => BEntity)
  oneAToOneBOwner?: DataRelation<BEntity>;

  @TestRelation(() => BEntity)
  oneAToManyB!: DataRelation<BEntity>[];

  @TestRelation(() => BEntity)
  manyAToOneB?: DataRelation<BEntity>;

  @TestRelation(() => BEntity)
  manyAToManyB!: DataRelation<BEntity>[];

  @TestRelation(() => BEntity)
  manyAToManyBOwner!: DataRelation<BEntity>[];

  @TestRelation(() => CEntity)
  oneAToOneC?: DataRelation<CEntity>;

  @TestRelation(() => CEntity)
  oneAToOneCOwner?: DataRelation<CEntity>;

  @TestRelation(() => CEntity)
  manyAToManyC!: DataRelation<CEntity>[];

  @TestRelation(() => CEntity)
  manyAToManyCOwner!: DataRelation<CEntity>[];

  @TestRelation(() => AEntity)
  manyAToManyAOwner!: DataRelation<AEntity>[];

  @TestRelation(() => AEntity)
  manyAToManyA!: DataRelation<AEntity>[];

  @TestRelation(() => AEntity)
  oneAToOneA?: DataRelation<AEntity>;

  @TestRelation(() => AEntity)
  oneAToOneAOwner?: DataRelation<AEntity>;

  @TestRelation(() => AEntity)
  oneAToManyA!: DataRelation<AEntity>[];

  @TestRelation(() => AEntity)
  manyAToOneA?: DataRelation<AEntity>[];
}

@Entity("B")
export class BEntity {
  @TestIdColumn()
  bId!: string;

  @Column({ nullable: true })
  bText?: string;

  @Column({ nullable: true })
  bNumber?: number;

  @TestRelation(() => AEntity)
  oneBToOneA?: DataRelation<AEntity>;

  @TestRelation(() => AEntity)
  oneBToOneAOwner?: DataRelation<AEntity>;

  @TestRelation(() => AEntity)
  oneBToManyA!: DataRelation<AEntity>[];

  @TestRelation(() => AEntity)
  manyBToOneA?: DataRelation<AEntity>;

  @TestRelation(() => AEntity)
  manyBToManyAOwner!: DataRelation<AEntity>[];

  @TestRelation(() => AEntity)
  manyBToManyA!: DataRelation<AEntity>[];

  @TestRelation(() => CEntity)
  oneBToOneC?: DataRelation<CEntity>;

  @TestRelation(() => CEntity)
  oneBToOneCOwner?: DataRelation<CEntity>;

  @TestRelation(() => CEntity)
  manyBToManyCOwner!: DataRelation<CEntity>[];

  @TestRelation(() => CEntity)
  manyBToManyC!: DataRelation<CEntity>[];
}

@Entity("C")
export class CEntity {
  @TestIdColumn()
  cId!: string;

  @Column({ nullable: true })
  cText?: string;

  @Column({ nullable: true })
  cNumber?: number;

  @TestRelation(() => BEntity)
  oneCToOneB?: DataRelation<BEntity>;

  @TestRelation(() => BEntity)
  oneCToOneBOwner?: DataRelation<BEntity>;

  @TestRelation(() => AEntity)
  oneCToOneA?: DataRelation<AEntity>;

  @TestRelation(() => AEntity)
  oneCToOneAOwner?: DataRelation<AEntity>;

  @TestRelation(() => AEntity)
  manyCToManyAOwner!: DataRelation<AEntity>[];

  @TestRelation(() => AEntity)
  manyCToManyA!: DataRelation<AEntity>[];

  @TestRelation(() => BEntity)
  manyCToManyBOwner!: DataRelation<BEntity>[];

  @TestRelation(() => BEntity)
  manyCToManyB!: DataRelation<BEntity>[];
}
export default [AEntity, BEntity, CEntity];
