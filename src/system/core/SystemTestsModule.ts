import Lazy from "@dabsi/common/patterns/Lazy";
import { Once } from "@dabsi/common/patterns/Once";
import DbModule from "@dabsi/modules/DbModule";
import LoaderModule from "@dabsi/modules/LoaderModule";
import ProjectModule from "@dabsi/modules/ProjectModule";
import RpcModule from "@dabsi/modules/rpc";
import ServerModule from "@dabsi/modules/ServerModule";
import SystemTests from "@dabsi/system/core/SystemTests";
import { CliCommand } from "@dabsi/typecli";
import { Module } from "@dabsi/typemodule";
import { ModuleRunner } from "@dabsi/typemodule/ModuleRunner";
import fs from "fs";
import Jasmine from "jasmine";
import path from "path";

@Module({
  cli: "system",
})
export default class SystemTestsModule {
  constructor(
    protected loaderModule: LoaderModule,
    readonly moduleRunner: ModuleRunner,
    protected projectModule: ProjectModule,
    protected dbModule: DbModule,
    readonly serverModule: ServerModule,
    readonly rpcModule: RpcModule
  ) {}

  @Lazy() protected get _constants() {
    const testDbFile = path.join(
      this.projectModule.bundleDir,
      "test-db.sqlite3"
    );
    return { testDbFile, backupDbFile: testDbFile + ".bk" };
  }

  @Once() protected async _getTestsDirs(): Promise<string[]> {
    const dirs: string[] = [];
    await Promise.all(
      this.loaderModule.getLoadedDirectories().map(async moduleDir => {
        const testsDir = path.join(moduleDir, "system-tests");
        if (await this.loaderModule.isDir(testsDir)) {
          dirs.push(testsDir);
        }
      })
    );
    return dirs;
  }

  protected async _findFiles(pattern: RegExp) {
    const files: string[] = [];
    for (const testsDir of await this._getTestsDirs()) {
      for (const baseName of await this.loaderModule.readDir(testsDir)) {
        const fileName = path.join(testsDir, baseName);
        if (await this.loaderModule.isFile(fileName)) {
          if (pattern.test(baseName)) {
            files.push(fileName);
          }
        }
      }
    }
    return files;
  }

  @Once() protected _getInternalFiles() {
    return this._findFiles(/^_.*(?<=\.tsx?$)/i);
  }

  @Once() protected _getSuiteFiles() {
    return this._findFiles(/(tests|^index)\.tsx?$/i);
  }

  @Once() protected async _loadInternalFiles() {
    SystemTests.module = this;

    for (const internalFile of await this._getInternalFiles()) {
      require(internalFile);
    }
  }

  @CliCommand("test.build")
  async buildTests() {
    await fs.promises.unlink(this._constants.backupDbFile).catch(() => null);
    this.dbModule.connectionOptions = {
      type: "sqlite",
      database: this._constants.backupDbFile,
      synchronize: true,
    };
    await this.dbModule.loadAndConnect();
    await this._loadInternalFiles();
    for (const build of SystemTests.onBuild) {
      await build();
    }
  }

  @CliCommand("test")
  async runTests() {
    await fs.promises.copyFile(
      this._constants.backupDbFile,
      this._constants.testDbFile
    );
    this.dbModule.connectionOptions = {
      type: "sqlite",
      database: this._constants.testDbFile,
    };
    await this.dbModule.loadAndConnect();
    await this.serverModule.load();

    await this._loadInternalFiles();

    const jasmine = new Jasmine({});
    jasmine.addSpecFiles(await this._getSuiteFiles());
    jasmine.execute();
  }
}
