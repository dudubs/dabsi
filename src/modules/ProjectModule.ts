import LoaderModule from "@dabsi/modules/LoaderModule";
import MakeModule from "@dabsi/modules/MakeModule";
import Platform from "@dabsi/modules/Platform";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { RpcResolverBuilder } from "@dabsi/modules/rpc/RpcResolverBuilder";
import ServerModule from "@dabsi/modules/ServerModule";
import { Resolver } from "@dabsi/typedi";
import { Module } from "@dabsi/typemodule";
import { ModuleRunner } from "@dabsi/typemodule/ModuleRunner";
import { TsConfigPaths2 } from "@dabsi/typestack/TsConfigPaths2";
import path from "path";

export class ProjectSettings {
  constructor(
    //
    readonly directory: string,
    readonly prod = false
  ) {}

  readonly name = path.basename(this.directory).toLowerCase();
}

@Module()
export default class ProjectModule {
  //

  readonly paths = new TsConfigPaths2({
    isDir: path => this.loaderModule.isDir(path),
    isFile: path => this.loaderModule.isFile(path),
    readJsonFile: async path => this.loaderModule.readJsonFile(path),
  });

  readonly configsDir = path.join(this.settings.directory, "configs");

  readonly generatedDir = path.join(this.settings.directory, "generated");

  readonly bundleDir = path.join(this.settings.directory, "bundle");

  readonly srcDir = path.join(this.settings.directory, "src");

  constructor(
    protected loaderModule: LoaderModule,
    public readonly settings: ProjectSettings,
    protected makeModule: MakeModule,
    moduleRunner: ModuleRunner
  ) {
    moduleRunner.process.push(async () => {
      await this.paths.load(
        path.join(this.settings.directory, "tsconfig.json")
      );
    });
  }
}

ServerModule.defineServerLoader(
  (RpcResolver as any) as RpcResolver<any>,
  rpcResolver => {
    return Resolver([RpcResolverBuilder], rb => {
      rb.add(rpcResolver);
    });
  }
);
