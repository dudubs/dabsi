// import yargs from "yargs";
// import { Inject } from "./Inject";
// import { Cli } from "../modules/Cli";
// import { ExpressBuilder } from "../modules/ExpressModule";
// import { Module } from "./Module";
// import { ModuleRunner } from "./ModuleRunner";
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
