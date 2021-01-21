// import { DataEntitySource } from "@dabsi/typedata/data-entity/DataEntitySource";
// import { DataSelectionRow } from "@dabsi/typedata/data-selection/DataSelectionRow";
// import { DataRow } from "@dabsi/typedata/DataRow";
// import { DataUnion } from "@dabsi/typedata/DataUnion";
// import {
//   DBase,
//   DChild1,
//   DChild1Child1,
//   DChild2,
//   DChild3,
//   DUnion,
//   EBase,
//   EChild1,
//   EChild1Child1,
//   EChild2,
// } from "@dabsi/typedata/tests/BaseEntities";
// import { TestConnection } from "@dabsi/typedata/tests/TestConnection";
// import {
//   AEntity,
//   BEntity,
//   CEntity,
// } from "@dabsi/typeorm/relations/tests/TestEntities";

// const getConnection = TestConnection([
//   DBase,
//   DChild1,
//   DChild2,
//   DChild3,
//   DChild1Child1,
//   EBase,
//   EChild1,
//   EChild2,
//   EChild1Child1,
//   AEntity,
//   BEntity,
//   CEntity,
// ]);

// const DUS = DataEntitySource.createFromConnection(DUnion, getConnection);
// const DC1S = DataEntitySource.createFromConnection(DChild1, getConnection);
// const DC2S = DataEntitySource.createFromConnection(DChild2, getConnection);
// const DC3S = DataEntitySource.createFromConnection(DChild3, getConnection);
// const DC1C1S = DataEntitySource.createFromConnection(
//   DChild1Child1,
//   getConnection
// );

// beforeAll(async () => {
//   await DC1S.insert({
//     dText: "DC1S",
//     dChild1Text: "DC1S",
//   });

//   await DC2S.insert({
//     dText: "DC2S",
//     dChild2Text: "DC2S",
//   });

//   await DC3S.insert({
//     dText: "DC3S",
//     dChild3Text: "DCDC3S2S",
//   });
// });

// it("", async () => {
//   const DUnion = DataUnion(DBase, {
//     children: {
//       DChild1,
//       DChild2,
//       DChild3,
//     },
//   });
//   const DSource = DataEntitySource.createFromConnection(DUnion, getConnection);
//   console.log(
//     await DSource.pick([])
//       //   .select({
//       //     children: {
//       //       DChild1: { pick: ["dText"] },
//       //     },
//       //   })
//       .getRows()
//   );
// });
