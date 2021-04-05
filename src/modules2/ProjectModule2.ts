import { AsyncProcess } from "@dabsi/common/async/AsyncProcess";
import { Defined } from "@dabsi/common/patterns/Defined";
import { LoaderModule2 } from "@dabsi/modules2/LoaderModule2";
import { Module, Plugin } from "@dabsi/typemodule";
import { TsConfigPaths2 } from "@dabsi/typestack/TsConfigPaths2";
import fs from "fs";
import path from "path";

@Module()
export class ProjectModule2 {
  //

  readonly paths = new TsConfigPaths2({
    isDir: path => this.loaderModule.isDir(path),
    isFile: path => this.loaderModule.isFile(path),
    readFile: async path => fs.promises.readFile(path, "utf-8"),
  });

  @Defined()
  directory!: string;

  constructor(protected loaderModule: LoaderModule2, process: AsyncProcess) {
    process.push(
      () => `${this.constructor.name}.Loader`,
      async () => {
        this.directory = await fs.promises.realpath(".");
        // await Promise.reject("Asd");
        await this.paths.load(path.join(this.directory, "tsconfig.json"));
      }
    );
  }
}
