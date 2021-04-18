import { Module } from "@dabsi/typemodule";
import { ModuleMetadata } from "@dabsi/typemodule/ModuleMetadata";
import { ModuleRunner } from "@dabsi/typemodule/ModuleRunner";
import fs from "fs";
import { Seq } from "immutable4";
import { dirname, join } from "path";

@Module()
export class LoaderModule2 {
  protected _loaderCallbacks: ((dir: string) => Promise<any>)[] = [];

  protected _readDirCache = new Map<string, Promise<string[]>>();

  protected _statCache = new Map<string, Promise<fs.Stats>>();

  protected _readJsonFileCache = new Map<string, any>();

  protected _loadedDirs = new Set<string>();

  constructor(protected moduleRunner: ModuleRunner) {
    moduleRunner.pushLoader(
      () => this.constructor.name,
      async target => {
        const metadata = ModuleMetadata.get(target);

        if (!/[\\\/](module|index)\.ts$/.test(metadata.anchor.path)) {
          return;
        }
        const dir = dirname(metadata.anchor.path);
        if (!this._loadedDirs.touch(dir)) return;

        await Promise.all(this._loaderCallbacks.map(loader => loader(dir)));
      }
    );
    ///
  }

  getLoadedDirectories(): Seq.Indexed<string> {
    return this._loadedDirs.toSeq();
  }

  tryToLoad(paths: string[], dir?: string) {
    return Promise.all(
      paths.toSeq().map(async modulePath => {
        if (dir) {
          modulePath = join(dir, modulePath);
        }
        if (!(await this.isFile(modulePath))) return;
        const { default: moduleTarget } = require(modulePath);
        if (typeof moduleTarget !== "function") return;
        this.moduleRunner.get(moduleTarget);
      })
    );
  }

  pushLoader(
    descriptor: () => string,
    loader: (dir: string) => Promise<any>,
    after?: () => any
  ) {
    this._loaderCallbacks.push(loader);

    this.moduleRunner.process.push(
      () => `${this.constructor.name}, ${descriptor()}`,
      async () => {
        await Promise.all(this._loadedDirs.toSeq().map(dir => loader(dir)));
        await after?.();
      }
    );
  }

  readDir(dir: string): Promise<string[]> {
    return this._readDirCache.touch(dir, () => fs.promises.readdir(dir));
  }

  stat(path: string): Promise<fs.Stats> {
    return this._statCache.touch(path, () => fs.promises.stat(path));
  }

  readJsonFile(path: string): Promise<any> {
    return this._readJsonFileCache.touch(path, async () =>
      JSON.parse(await fs.promises.readFile(path, "utf-8"))
    );
  }

  async isFile(path: string): Promise<boolean> {
    return this.stat(path)
      .then(s => s.isFile())
      .catch(() => false);
  }

  isDir(path: string): Promise<boolean> {
    return this.stat(path)
      .then(s => s.isDirectory())
      .catch(() => false);
  }

  async resolveIndexFile(path: string): Promise<string | undefined> {
    const files = await Promise.all(
      ["index.ts", "index.tsx"].map(async baseName => {
        const indexPath = join(path, baseName);
        return {
          indexPath,
          isFile: await this.isFile(indexPath),
        };
      })
    );
    return files.find(f => f.isFile)?.indexPath;
  }
}
