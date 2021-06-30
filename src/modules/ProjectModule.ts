import { Once } from "@dabsi/common/patterns/Once";
import LoaderModule from "@dabsi/modules/LoaderModule";
import { BaseRpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { RpcResolverGenerator } from "@dabsi/modules/rpc/RpcResolverGenerator";
import ServerModule from "@dabsi/modules/ServerModule";
import { Resolver } from "@dabsi/typedi";
import { Module } from "@dabsi/typemodule";
import { TsConfigPaths2 } from "@dabsi/typestack/TsConfigPaths2";
import path from "path";
import { ProjectDependency } from "./ProjectDependency";

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

  readonly configsDir = path.join(this.settings.directory, "configs");

  readonly generatedDir = path.join(this.settings.directory, "generated");

  readonly bundleDir = path.join(this.settings.directory, "bundle");

  readonly srcDir = path.join(this.settings.directory, "src");

  constructor(
    protected loaderModule: LoaderModule,
    public readonly settings: ProjectSettings
  ) {}

  @Once() async getPaths(): Promise<TsConfigPaths2> {
    const paths = new TsConfigPaths2({
      isDir: path => this.loaderModule.isDir(path),
      isFile: path => this.loaderModule.isFile(path),
      readJsonFile: async path => this.loaderModule.readJsonFile(path),
    });
    await paths.load(path.join(this.settings.directory, "tsconfig.json"));
    return paths;
  }

  @Once() async getProjectDependency(): Promise<ProjectDependency> {
    return ProjectDependency.load(
      await this.getPaths(),
      this.settings.directory
    );
  }
}
