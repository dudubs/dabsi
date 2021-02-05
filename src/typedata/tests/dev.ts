// import { findEntities } from "@dabsi/typeorm/findEntities";
// import { AEntity } from "@dabsi/typeorm/relations/tests/TestEntities";
// import {
//   ChildEntity,
//   Column,
//   createConnection,
//   Entity,
//   ManyToOne,
//   PrimaryGeneratedColumn,
//   TableInheritance,
// } from "typeorm";

// fit("", async () => {
//   @Entity()
//   @TableInheritance({ column: "type" })
//   class X {
//     @PrimaryGeneratedColumn()
//     id!: number;

//     @Column()
//     type!: string;
//   }

//   @Entity()
//   class R1 {
//     @PrimaryGeneratedColumn()
//     id!: number;
//   }

//   @Entity()
//   class R2 {
//     @PrimaryGeneratedColumn()
//     id!: number;
//   }

//   @ChildEntity()
//   class XC1 extends X {
//     @ManyToOne(() => R2)
//     r!: any;
//   }

//   @ChildEntity()
//   class XC2 extends X {
//     @ManyToOne(() => R2)
//     r!: any;
//   }

//   const connection = await createConnection({
//     name: "xxx",
//     type: "sqlite",
//     database: ":memory:",
//     // logging: "all",
//     synchronize: true,
//     entities: findEntities([X, XC1, XC2, R1, R2]),
//   });

//   //   console.log("----");

//   console.log([
//     connection.getMetadata(XC1).relations.map(x => [x.propertyName, x.type]),
//     connection.getMetadata(XC2).relations.map(x => [x.propertyName, x.type]),
//   ]);

//   const m = connection.createEntityManager();
//   //   m.save([m.create(AEntity), m.create(AEntity)]);
// });
