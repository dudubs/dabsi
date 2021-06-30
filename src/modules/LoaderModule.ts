import { Module } from "@dabsi/typemodule";
import ModuleMetadata from "@dabsi/typemodule/ModuleMetadata";
import { ModuleRunner } from "@dabsi/typemodule/ModuleRunner";
import fs from "fs";
import { Seq } from "immutable4";
import path from "path";
import { dirname, join } from "path";

type DirectoryModuleLoader = (moduledir: string) => Promise<any>;

type FileModuleLoader = (pathInfo: {
  fileName: string;
  baseName: string;
  directory: string;
}) => Promise<any>;

@Module()
export default class LoaderModule {
  protected _directoryLoaders: DirectoryModuleLoader[] = [];

  protected _fileLoaders: FileModuleLoader[] = [];

  protected _readDirCache = new Map<string, Promise<string[]>>();

  protected _statCache = new Map<string, Promise<fs.Stats>>();

  protected _readJsonFileCache = new Map<string, any>();

  protected _loadedDirectories = new Set<string>();

  protected _loadedFiles = new Set<string>();

  constructor(protected moduleRunner: ModuleRunner) {
    moduleRunner.pushLoader(async target => {
      const metadata = ModuleMetadata.get(target);

      const fileName = metadata.args.anchor!.path;
      if (!/[\\\/](module|index|main)\.ts$/.test(fileName)) {
        const pathInfo = {
          fileName,
          baseName: path.basename(fileName),
          directory: path.dirname(fileName),
        };
        await Promise.all(this._fileLoaders.map(loader => loader(pathInfo)));
        return;
      }
      const dir: string = dirname(metadata.args.anchor!.path);

      if (!this._loadedDirectories.touch(dir)) return;

      await Promise.all(this._directoryLoaders.map(loader => loader(dir)));
    });
    ///
  }

  getLoadedDirectories(): readonly string[] {
    this.moduleRunner.lock();
    return [...this._loadedDirectories];
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

  pushDirectoryLoader(loader: DirectoryModuleLoader) {
    this._directoryLoaders.push(loader);

    this.moduleRunner.process.push(async () => {
      await Promise.all(
        this._loadedDirectories.toSeq().map(dir => loader(dir))
      );
    });
  }

  pushFileLoader(loader: FileModuleLoader) {
    this._fileLoaders.push(loader);

    this.moduleRunner.process.push(async () => {
      await Promise.all(
        this._loadedFiles.toSeq().map(fileName =>
          loader({
            fileName,
            baseName: path.basename(fileName),
            directory: path.dirname(fileName),
          })
        )
      );
    });
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
