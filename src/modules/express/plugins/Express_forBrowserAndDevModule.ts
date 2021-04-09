// import { Debounce } from "@dabsi/common/async/Debounce";
// import { makeHtml } from "@dabsi/common/makeHtml";
// import { NODE_MODULES_DIR } from "@dabsi/env";
// import watch from "@dabsi/filesystem/watch";
// import watchReloadFile from "@dabsi/filesystem/watchReloadFile";
// import BrowserModule from "@dabsi/modules/BrowserModule";
// import ExpressModule from "@dabsi/modules/express";
// import { Module } from "@dabsi/typedi";
// import { DevModule } from "@dabsi/typestack/DevModule";
// import express from "express";
// import path from "path";
// import reload from "reload";

// @Module()
// export default class ExpressForBrowserAndDevModule {
//   constructor(
//     devModule: DevModule,
//     expressModule: ExpressModule,
//     browserModule: BrowserModule
//   ) {
//     const { log } = devModule;

//     browserModule.scripts.push("/reload/reload.js");

//     expressModule.beforeBuildRoutes(app => {
//       app.use(
//         "/tests/lib",
//         express.static(
//           path.join(NODE_MODULES_DIR, "jasmine-core/lib/jasmine-core")
//         )
//       );
//       app.use("/tests", (req, res) => {
//         res.header("Content-Type", "text/html").send(
//           makeHtml({
//             scripts: [
//               "/reload/reload.js",
//               "/tests/lib/jasmine.js",
//               "/tests/lib/jasmine-html.js",
//               "/tests/lib/boot.js",
//               "/bundle/browser/vendor.js",
//               "/bundle/browser/index.js",
//               "/bundle/browser/tests.js",
//               "/bundle/browser/runtime.js",
//             ],
//             head: `<link rel="stylesheet" href="/tests/lib/jasmine.css">`,
//           })
//         );
//       });
//     });

//     devModule.onRunAsParent(async () => {
//       browserModule.compile();
//       watchReloadFile("browser", () => {
//         browserModule.compile();
//       });
//       watchReloadFile("view", () => {
//         browserModule.compile();
//       });
//       watchReloadFile("common", () => {
//         browserModule.compile();
//       });
//     });

//     expressModule.onBuildRoutes(app => {
//       if (devModule.watchOnly) return;
//       const debounce = Debounce(200);
//       log.info("starting reload server...");
//       reload(app).then(server => {
//         const path = "./bundle/browser";
//         log.info(() => `watching ${path}`);
//         const watcher = watch(path, async () => {
//           // TODO: debounce
//           if (await debounce()) {
//             log.info("reloading browser...");
//             server.reload();
//           }
//         });
//         process.on("SIGINT", () => {
//           watcher.close();
//           server.closeServer();
//         });
//       });
//     });
//   }
// }
