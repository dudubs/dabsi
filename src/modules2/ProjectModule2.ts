import { AsyncProcess } from "@dabsi/common/async/AsyncProcess";
import { LoaderModule2 } from "@dabsi/modules2/LoaderModule2";
import { Inject, Resolver } from "@dabsi/typedi";
import { Module } from "@dabsi/typemodule";
import { TsConfigPaths2 } from "@dabsi/typestack/TsConfigPaths2";
import path from "path";

export const ProjectDirectory = Resolver<string>();

@Module()
export class ProjectModule2 {
  //

  readonly paths = new TsConfigPaths2({
    isDir: path => this.loaderModule.isDir(path),
    isFile: path => this.loaderModule.isFile(path),
    readJsonFile: async path => this.loaderModule.readJsonFile(path),
  });

  constructor(
    protected loaderModule: LoaderModule2,
    process: AsyncProcess,

    @Inject(ProjectDirectory)
    public readonly directory: string
  ) {
    process.push(
      () => `${this.constructor.name}.Loader`,
      async () => {
        await this.paths.load(path.join(this.directory, "tsconfig.json"));
      }
    );
  }
}
