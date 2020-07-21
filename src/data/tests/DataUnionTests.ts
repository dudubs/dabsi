// import {DataUnion} from "../DataUnion";
// import {ABase, AChild1, AChild1Child1, AChild2, BBase, BChild1, BChild1Child1, BChild2} from "./BaseEntities";
// import {TestConnection} from "./TestConnection";
//
//
// testm(__filename, () => {
//
//     class BData extends DataUnion(BBase, "bType", {
//         BChild1,
//         BChild2,
//         BChild1Child1
//     }) {
//
//     }
//
//     function testType<T>(): T {
//         throw new Error()
//     }
//
//
//     class AData extends DataUnion(ABase, "aType", {
//         child1: AChild1,
//         child2: AChild2,
//         child1Child1: AChild1Child1
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
//     const getConnection = TestConnection([ABase, AChild1, AChild2, AChild1Child1,
//         BBase, BChild1, BChild2, BChild1Child1]);
//
//     fit('typeorm sanity', () => {
//         const aMetadata =
//             getConnection()
//                 .getMetadata(ABase);
//         const childTargets = aMetadata.childEntityMetadatas.map(c => c.target);
//
//         expect(childTargets)
//             .not.toContain(ABase);
//         expect(childTargets)
//             .toContain(AChild1Child1);
//         expect(childTargets)
//             .toContain(AChild2);
//
//         expect(aMetadata.discriminatorColumn?.databaseName)
//             .toEqual("type");
//
//
//     })
// })
