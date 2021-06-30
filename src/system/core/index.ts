import fs from "fs";
import { RequestBuilder } from "@dabsi/modules/RequestBuilder";
import RpcModule from "@dabsi/modules/rpc";
import { SessionModule } from "@dabsi/modules/session";
import { CliCommand } from "@dabsi/typecli";
import { ResolverMap } from "@dabsi/typedi";
import { Module, Plugin } from "@dabsi/typemodule";
import SystemRpc, { SYSTEM_RPC_PATH } from "./common/rpc";
import Jasmine from "jasmine";
import LoaderModule from "@dabsi/modules/LoaderModule";
import path from "path";
import SystemTests from "@dabsi/system/core/SystemTests";
import { ModuleRunner } from "@dabsi/typemodule/ModuleRunner";
import ServerModule from "@dabsi/modules/ServerModule";
import DbModule from "@dabsi/modules/DbModule";
import ProjectModule from "@dabsi/modules/ProjectModule";
import Lazy from "@dabsi/common/patterns/Lazy";
@Module({
  dependencies: [SessionModule],
  cli: "system",
})
export default class SystemModule {
  readonly log = log.get("SYSTEM");

  readonly request = new RequestBuilder();

  constructor(
    readonly rpcModule: RpcModule,
    protected loaderModule: LoaderModule,
    readonly moduleRunner: ModuleRunner,
    readonly serverModule: ServerModule,
    readonly dbModule: DbModule,
    readonly projectModule: ProjectModule
  ) {}

  async check(context: ResolverMap) {
    this.log.trace(`Checking..`);
    this.rpcModule.check(SystemRpc, context);
  }

  installRpc(@Plugin() rpcModule: RpcModule) {
    rpcModule.serve(SYSTEM_RPC_PATH, SystemRpc);
  }

  // @CliCommand("tests")
  async runTests() {
    //

    const jasmine = new Jasmine({});

    const testsFiles: string[] = [];
    const internalFiles: string[] = [];

    for (const moduleDir of this.loaderModule.getLoadedDirectories()) {
      const testsDir = path.join(moduleDir, "system-tests");
      for (const baseName of await this.loaderModule
        .readDir(testsDir)
        .catch(() => [])) {
        const fileName = path.join(testsDir, baseName);
        if (/(tests|^index)\.tsx?$/i.test(baseName)) {
          testsFiles.push(fileName);
        } else if (/^_.*(?<=\.tsx?$)/i.test(baseName)) {
          internalFiles.push(fileName);
        }
      }
    }

    console.log({ testsFiles, internalFiles });

    jasmine.execute();
    // jasmine.addSpecFiles([]);
  }
}
