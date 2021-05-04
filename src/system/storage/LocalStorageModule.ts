import { ExpressModule2 } from "@dabsi/modules2/ExpressModule2";
import { ProjectModule2 } from "@dabsi/modules2/ProjectModule2";
import { LocalStorage } from "@dabsi/system/storage/LocalStorage";
import StorageModule from "@dabsi/system/storage/module";
import { Storage } from "@dabsi/system/storage/Storage";
import { Resolver } from "@dabsi/typedi";
import { Module, Plugin } from "@dabsi/typemodule";
import { ModuleRunnerContext } from "@dabsi/typemodule/ModuleRunner";
import express from "express";
import path from "path";

const LOCAL_STORAGE_URL = "/bundle/local-storage";

@Module({ dependencies: [StorageModule] })
export class LocalStorageModule {
  constructor(protected projectModule: ProjectModule2) {}

  get directory(): string {
    return path.join(
      this.projectModule.settings.directory,
      "bundle/local-storage"
    );
  }

  installContext(@Plugin() context: ModuleRunnerContext) {
    Resolver.Context.assign(
      context,
      Resolver(Storage, () => {
        return new LocalStorage(this.directory, LOCAL_STORAGE_URL);
      })
    );
  }

  installExpress(@Plugin() expressModule: ExpressModule2) {
    expressModule.preBuilders.push(app => {
      app.use(LOCAL_STORAGE_URL, express.static(this.directory), (req, res) => {
        res.status(404).send("File not found.");
      });
    });
  }
}
