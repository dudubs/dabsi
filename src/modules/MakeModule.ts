import LoaderModule from "@dabsi/modules/LoaderModule";
import { Module } from "@dabsi/typemodule";
import * as fs from "fs";
import path, { dirname } from "path";

const DEBUG_MAKE = false;

@Module()
export default class MakeModule {
  protected _touchedDirs = new Map();

  constructor(protected loaderModule: LoaderModule) {}

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
    log("make file " + path);
    if (DEBUG_MAKE) {
      console.log("  " + text.replace(/\n/g, "\n  "));
    } else {
      await fs.promises.writeFile(path, text);
    }
  }

  async makeTsconfigFile<
    C extends { extends?: string; compilerOptions?: {}; include?: string[] }
  >(outFileName: string, c: C) {
    const outDir = path.dirname(outFileName);
    const relative = (p: string) => {
      if (/\.\.?([\\\/]|$)/.test(p)) return p;
      const relP = path.posix.relative(outDir, p);
      if (relP.startsWith(".")) return relP;
      return "./" + relP;
    };

    const relativeProp = (o, p) =>
      typeof o[p] === "string" ? { [p]: relative(o[p] as any) } : null;

    const co = c.compilerOptions;

    return this.makeJsonFile(outFileName, {
      ...c,
      ...relativeProp(c, "extends"),

      ...(co
        ? {
            compilerOptions: {
              ...co,
              ...relativeProp(co, "baseUrl"),
            },
          }
        : null),

      ...(c.include
        ? { include: c.include.toSeq().map(relative).sort().toSet().toArray() }
        : {}),
    });
  }
}
