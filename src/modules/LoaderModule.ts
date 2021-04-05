import { Cached } from "@dabsi/common/patterns/Cached";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Module } from "@dabsi/typedi";
import fs, { readdirSync, readFileSync, statSync } from "fs";
import path from "path";

const cachedProperties = [] as any[];

@Module()
export default class LoaderModule {
  loaders: (() => Awaitable)[] = [];

  directoryLoaders: ((dir: string) => Awaitable)[] = [];

  loadedDirs = new Set<string>();

  async load() {
    while (this.loaders.length) {
      const { loaders } = this;
      this.loaders = [];
      await Promise.all(loaders.map(loader => loader()));
    }
  }

  clearCache() {
    for (const propertyName of cachedProperties) {
      Cached.clear(this, propertyName);
    }
  }

  isFile(fileName: string): boolean {
    try {
      return this.stat(fileName).isFile();
    } catch {
      return false;
    }
  }

  isDir(fileName: string): boolean {
    try {
      return this.stat(fileName).isDirectory();
    } catch {
      return false;
    }
  }

  @Cached(cachedProperties) readFile(path: string): string {
    return readFileSync(path, "utf8");
  }
  @Cached(cachedProperties) readJsonFile(path: string) {
    return JSON.parse(this.readFile(path));
  }

  @Cached(cachedProperties)
  findIndexFileName(dir: string): string | undefined {
    for (const baseName of ["index.ts", "index.tsx"]) {
      const indexFileName = path.join(dir, baseName);
      if (this.isFile(indexFileName)) {
        return indexFileName;
      }
    }
  }

  findIndexFiles(dir: string) {
    const indexFileName = this.findIndexFileName(dir);
    if (!indexFileName) return;

    const files: string[] = [indexFileName];

    for (const baseName of this.readDir(dir)) {
      if (!baseName.startsWith("index.")) continue;
      const fileName = path.join(dir, baseName);
      if (/\.tsx?$/.test(baseName)) {
        files.push(fileName);
        continue;
      }
      const indexFileName = this.findIndexFileName(fileName);
      indexFileName && files.push(indexFileName);
    }
    return files;
  }

  @Cached(cachedProperties)
  async loadDir(dir: string) {
    if (!this.loadedDirs.touch(dir)) return;
    await Promise.all(this.directoryLoaders.map(loader => loader(dir)));
  }

  @Cached(cachedProperties) readDir(dir: string): string[] {
    if (!this.isDir(dir)) return [];
    return readdirSync(dir);
  }

  @Cached(cachedProperties) stat(path: string): fs.Stats {
    return statSync(path);
  }

  *readDirDeep(dir: string): IterableIterator<string> {
    for (const baseName of this.readDir(dir)) {
      const fileName = path.join(dir, baseName);
      const stat = this.stat(fileName);
      if (stat.isDirectory()) {
        yield* this.readDirDeep(fileName);
      } else {
        yield fileName;
      }
    }
  }
}
