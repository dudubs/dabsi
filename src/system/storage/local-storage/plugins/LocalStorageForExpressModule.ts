import { DABSI_CURRENT_PATH } from "@dabsi/index";
import ExpressModule from "@dabsi/modules/express";
import LocalStorageModule from "@dabsi/system/storage/local-storage";
import { Inject, Module } from "@dabsi/typedi";
import express from "express";
import { mkdirSync, realpathSync } from "fs";
import path from "path";

@Module()
export default class LocalStorageForExpressModule {
  constructor(
    @Inject()
    expressModule: ExpressModule,
    @Inject()
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
