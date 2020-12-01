// import { Connection } from "typeorm";
// import { DataRow } from "../../typedata/DataRow";
// import { Resolver } from "../../typedi";
// import { AclUsersManager } from "../common/AclUsersManager";
// import { SystemApp } from "../common/SystemApp";
// import { SystemRequestResolvers } from "./SystemRequestResolvers";
// import { SystemSession } from "../../system/core/SystemSession";
// import { SystemTester, testSystemAs } from "./SystemTester";
// import objectContaining = jasmine.objectContaining;
//
// const t = SystemTester;
//
// testm(__filename, () => {
//   xit("", async () => {
//     testSystemAs("admin");
//     expect(t.users.admin.loginName).toBeDefined();
//
//     console.log(
//       await AclUsersManager.service
//         .edit(t.users.regular.$key)
//         .map.form.input //
//         .map.basicInfo //
//         .map.loginName //
//         .check("admin")
//     );
//   });
//
//   it("check system request context", () => {
//     expect(() =>
//       Resolver.checkContext({
//         ...SystemRequestResolvers,
//         ...Connection.provide(() => {
//           throw new Error("No connection");
//         }),
//         ...DataRow(SystemSession).provide(() => {
//           throw new Error("No systemSession");
//         }),
//       })
//     ).not.toThrow();
//   });
//   describe("getLoginInfo", () => {
//     it("expect 'regular' login info", async () => {
//       testSystemAs("regular");
//       expect(await SystemApp.service.getLoginInfo()).toEqual(
//         objectContaining({
//           type: "SUCCESS",
//           isAdmin: false,
//         })
//       );
//     });
//
//     it("expect to 'admin' login info", async () => {
//       testSystemAs("admin");
//       expect(await SystemApp.service.getLoginInfo()).toEqual(
//         objectContaining({
//           type: "SUCCESS",
//           isAdmin: true,
//         })
//       );
//     });
//     it("expect to 'SystemApp' login info", async () => {
//       testSystemAs("anonymous");
//       expect(await SystemApp.service.getLoginInfo()).toEqual(
//         objectContaining({
//           type: "FAILED",
//         })
//       );
//     });
//   });
// });
