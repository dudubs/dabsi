import fs from "fs";
import { Module } from "@dabsi/typemodule";
import { ModuleMetadata } from "@dabsi/typemodule/ModuleMetadata";
import { ModuleRunner } from "@dabsi/typemodule/ModuleRunner";
import { dirname, join } from "path";
import { AsyncProcess } from "@dabsi/common/async/AsyncProcess";
import { from } from "rxjs";
import { Tick } from "@dabsi/common/async/Tick";

@Module()
export class LoaderModule2 {
  protected _dirLoaders: ((dir: string) => Promise<any>)[] = [];

  protected _loadedDirs = new Set<string>();

  constructor(protected moduleRunner: ModuleRunner) {
    moduleRunner.pushLoader(async target => {
      const metadata = ModuleMetadata.get(target);

      if (!/[\\\/](module|index)\.ts$/.test(metadata.anchor.path)) {
        return;
      }
      const dir = dirname(metadata.anchor.path);
      if (!this._loadedDirs.touch(dir)) return;

      await Promise.all(this._dirLoaders.map(loader => loader(dir)));
    });
    ///
  }

  pushLoader(loader: (dir: string) => Promise<any>) {
    this._dirLoaders.push(loader);

    this.moduleRunner.process.push(
      Promise.all(
        this._loadedDirs
          .toSeq()
          .map(dir => loader(dir))
          .toArray()
      )
    );
  }

  protected _readDirCache = new Map<string, Promise<string[]>>();
  protected _statCache = new Map<string, Promise<fs.Stats>>();

  readDir(dir: string): Promise<string[]> {
    return this._readDirCache.touch(dir, () => fs.promises.readdir(dir));
  }

  stat(path: string): Promise<fs.Stats> {
    return this._statCache.touch(path, () => fs.promises.stat(path));
  }

  isFile(path: string): Promise<boolean> {
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

function readDirAsync(d) {
  console.log({ readDirAsync: d });
  return fs.promises
    .readdir(d)
    .then(files => {
      console.log({ files });

      return files;
    })
    .catch(error => {
      console.log({ readDirError: error });
      return [];
    });
}
