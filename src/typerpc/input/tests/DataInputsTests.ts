// import { Column, Entity, PrimaryColumn } from "typeorm";
// import { DataEntitySource } from "../../../data/eds/DataEntitySource";
// import { TestConnection } from "../../../data/tests/TestConnection";
// import { BoolInput } from "../bool-input/BoolInput";
// import { DataInput } from "../data-input/DataInput";
// import { DataInputMap } from "../data-input-map/DataInputMap";
// import { testCase } from "./CaseTester";
// import { testRpcOld } from "./RpcTesterOld";
// import objectContaining = jasmine.objectContaining;
//
// testm(__filename, () => {
//   @Entity()
//   class A {
//     @PrimaryColumn()
//     id: string;
//
//     @Column()
//     text: string;
//   }
//
//   const getConnection = TestConnection([A]);
//   const source = DataEntitySource.create(A, getConnection);
//
//   const rows = [
//     { id: "1", text: "hello" },
//     { id: "2", text: "world" },
//     { id: "3", text: "foo" },
//     { id: "4", text: "bar" },
//   ] as const;
//
//   beforeAll(async () => {
//     for (const row of rows) {
//       await source.insert(row);
//     }
//   });
//
//   describe("DataInput", () => {
//     testCase("nullable", [false, true], nullable => {
//       testRpcOld(DataInput({ nullable }), t => {
//         t.testConfig("sanity", $ =>
//           $({
//             source,
//             columns: { label: { field: "text", load: r => r.text } },
//           })
//         );
//
//         t.testInputValue(rows[0].id, rows[0].id);
//         t.testInputValue(rows[1].id, rows[1].id);
//         if (nullable) {
//           t.testInputValue(null, null);
//         } else {
//           t.testInputError(null, "REQUIRED");
//         }
//       });
//     });
//   });
//
//   describe("DataInputMap", () => {
//     testRpcOld(DataInputMap(BoolInput()), t => {
//       t.testConfig("sanity", $ =>
//         $({
//           source,
//           getTargetValue: row => row.text.length > 3,
//           columns: {
//             label: {
//               field: "text",
//               load: row => row.text,
//             },
//           },
//         })
//       );
//
//       t.testInputValue({}, {});
//       t.testInputValue(
//         { [rows[0].id]: false },
//         {
//           [rows[0].id]: false,
//         }
//       );
//       t.testInputError({ x: false }, { invalidKeys: ["x"] });
//
//       t.testWidgetElement(t => {
//         it("expect target default will be true", () => {
//           expect(t.element.children).toContain(
//             objectContaining({
//               row: objectContaining({ text: "hello" }),
//               target: { default: true },
//             })
//           );
//         });
//
//         it("expect target default will be false", () => {
//           expect(t.element.children).toContain(
//             objectContaining({
//               row: objectContaining({ text: "foo" }),
//               target: { default: false },
//             })
//           );
//         });
//       });
//     });
//   });
// });
