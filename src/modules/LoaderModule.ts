import Cache from "@dabsi/common/patterns/Cache";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Hookable } from "@dabsi/modules/Hookable";
import { Module } from "@dabsi/typedi";
import fs from "fs";
import path from "path";

const cachedProperties = [] as any[];

@Module()
export default class LoaderModule {
  loaders: (() => Awaitable)[] = [];

  onLoadDir = Hookable<(dir: string) => Awaitable>();

  async load() {
    while (this.loaders.length) {
      const { loaders } = this;
      this.loaders = [];
      await Promise.all(loaders.map(loader => loader()));
    }
  }

  clearCache() {
    for (const propertyName of cachedProperties) {
      Cache.clear(this, propertyName);
    }
  }

  async isFile(fileName: string): Promise<boolean> {
    return this.stat(fileName)
      .then(stat => stat.isFile())
      .catch(() => false);
  }

  isDir(path: string): Promise<boolean> {
    return this.stat(path)
      .then(stat => stat.isDirectory())
      .catch(() => false);
  }

  @Cache(cachedProperties) async readFile(path: string): Promise<string> {
    return fs.promises.readFile(path, "utf8");
  }
  @Cache(cachedProperties) async readJsonFile(path: string) {
    return JSON.parse(await this.readFile(path));
  }

  @Cache(cachedProperties)
  async getIndexFile(dir: string): Promise<string | undefined> {
    for (const baseName of ["index.ts", "index.tsx"]) {
      const indexFileName = path.join(dir, baseName);
      if (await this.isFile(indexFileName)) {
        return indexFileName;
      }
    }
  }

  @Cache(cachedProperties)
  async loadDir(dir: string) {
    this.onLoadDir.invoke(dir);
  }

  @Cache(cachedProperties) readDir(dir: string): Promise<string[]> {
    return fs.promises.readdir(dir);
  }

  @Cache(cachedProperties) async stat(path: string): Promise<fs.Stats> {
    return fs.promises.stat(path);
  }

  @Cache(cachedProperties)
  async *readDirDeep(dir: string): AsyncIterableIterator<string> {
    for (const baseName of await this.readDir(dir)) {
      const fileName = path.join(dir, baseName);
      const stat = await this.stat(fileName);
      if (stat.isDirectory()) {
        yield* this.readDirDeep(fileName);
      } else {
        yield fileName;
      }
    }
  }
}
