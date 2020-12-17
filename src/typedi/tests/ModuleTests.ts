// import yargs from "yargs";
// import { Inject } from "@dabsi/typedi/tests/Inject";
// import { Cli } from "@dabsi/typedi/modules/Cli";
// import { ExpressBuilder } from "@dabsi/typedi/modules/ExpressModule";
// import { Module } from "@dabsi/typedi/tests/Module";
// import { ModuleRunner } from "@dabsi/typedi/tests/ModuleRunner";
//
// @Module()
// export class MyModule {
//   constructor(@Inject() expressBuilder: ExpressBuilder) {
//     expressBuilder.push(app => {
//       app.listen(8080, "0.0.0.0");
//     });
//   }
// }
//
// describe(__filename, () => {
//   it("", () => {
//     const runner = new ModuleRunner();
//
//     runner.get(MyModule);
//     runner.get(Cli).build(yargs);
//   });
// });
//
// // typestack --module "" browser dev
