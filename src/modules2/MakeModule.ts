import * as fs from "fs";
import { Module } from "@dabsi/typemodule";
import { LoaderModule2 } from "@dabsi/modules2/LoaderModule2";
import { dirname } from "path";

@Module()
export default class MakeModule {
  protected _touchedDirs = new Map();

  constructor(protected loaderModule: LoaderModule2) {}

  async touchDir(dir: string) {
    return this._touchedDirs.touch(dir, async () => {
      if (await this.loaderModule.isDir(dir)) {
        return;
      }
      await this.touchDir(dirname(dir));
      await fs.promises.mkdir(dir);
    });
  }

  async makeJsonFile(path: string, data: any) {
    await this.makeTextFile(path, JSON.stringify(data, null, 2));
  }

  async makeTextFile(path: string, text: string) {
    await this.touchDir(dirname(path));
    console.log("make file " + path);
    // console.log("  " + text.replace(/\n/g, "\n  "));

    await fs.promises.writeFile(path, text);
  }
}
