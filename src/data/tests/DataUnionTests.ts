// import {DataUnion} from "../DataUnion";
// import {DBase, DChild1, DChild1Child1, DChild2, EBase, EChild1, EChild1Child1, EChild2} from "./BaseEntities";
// import {TestConnection} from "./TestConnection";
//
//
// testm(__filename, () => {
//
//     class BData extends DataUnion(EBase, "bType", {
//         EChild1,
//         EChild2,
//         EChild1Child1
//     }) {
//
//     }
//
//     function testType<T>(): T {
//         throw new Error()
//     }
//
//
//     class AData extends DataUnion(DBase, "aType", {
//         child1: DChild1,
//         child2: DChild2,
//         child1Child1: DChild1Child1
//     }, {
//         manyAToOneB: BData,
//         manyAToManyBOwner: BData
//     }) {
//
//     }
//
//     // InstanceType<typeof AData>
//
//
//     // DataUnion<typeof AData>
//     function x(): {
//         new(): {
//             type: "x", x: 1
//
//             unions: { cat }
//         }
//
//     } {
//         return <any>function () {
//
//         }
//     }
//
//     /*
//
//         $union: {type:"cat"}
//
//
//         IsUnion
//
//         fields
//
//         unions: {
//             a: {fields, relations, unions}
//         }
//
//         $union: {type:"cat"}
//
//         a.cat??a.dog
//
//
//
//
//      */
//
//     class a extends x() {
//
//     }
//
//     const getConnection = TestConnection([DBase, DChild1, DChild2, DChild1Child1,
//         EBase, EChild1, EChild2, EChild1Child1]);
//
//     fit('typeorm sanity', () => {
//         const aMetadata =
//             getConnection()
//                 .getMetadata(DBase);
//         const childTargets = aMetadata.childEntityMetadatas.map(c => c.target);
//
//         expect(childTargets)
//             .not.toContain(DBase);
//         expect(childTargets)
//             .toContain(DChild1Child1);
//         expect(childTargets)
//             .toContain(DChild2);
//
//         expect(aMetadata.discriminatorColumn?.databaseName)
//             .toEqual("type");
//
//
//     })
// })
