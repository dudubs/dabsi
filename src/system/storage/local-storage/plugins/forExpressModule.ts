import ExpressModule from "@dabsi/modules/express";
import LocalStorageModule from "@dabsi/system/storage/local-storage";
import { Module } from "@dabsi/typedi";
import express from "express";

@Module()
export default class LocalStorageForExpressModule {
  constructor(
    expressModule: ExpressModule,

    localStorageModule: LocalStorageModule
  ) {
    expressModule.beforeBuildRoutes(app => {
      app.use(
        localStorageModule.url,
        express.static(localStorageModule.localDir)
      );
    });
  }
}
