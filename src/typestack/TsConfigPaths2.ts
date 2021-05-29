// TODO: use tsconfig-paths module.
import fs from "fs";
import { entries } from "@dabsi/common/object/entries";
import { touchObject } from "@dabsi/common/object/touchObject";
import path, { join } from "path";

export type TsPathsWithBaseUrl = {
  baseUrl: string;
  paths: Record<string, string[]>;
};
type PathTable = {
  [SrcPrefix: string]: {
    [SrcSuffix: string]: [TargetPrefix: string, TargetSuffix: string][];
  };
};

type TsConfigPathsFs = {
  isDir(path: string): Promise<boolean>;
  isFile(path: string): Promise<boolean>;
  readJsonFile(path: string): Promise<any>;
};
export class TsConfigPaths2 {
  static createFs(): TsConfigPathsFs {
    const cached = callback => {
      const map = new Map();
      return path => map.touch(path, () => callback(path));
    };
    return {
      readJsonFile: cached(async path =>
        JSON.parse(await fs.promises.readFile(path, "utf-8"))
      ),
      isDir: cached(path =>
        fs.promises
          .stat(path)
          .then(s => s.isDirectory())
          .catch(() => false)
      ),
      isFile: cached(path =>
        fs.promises
          .stat(path)
          .then(s => s.isDirectory())
          .catch(() => false)
      ),
    };
  }
  protected _tsPathTable: PathTable = {};
  protected _fsPathTable: PathTable = {};
  protected _resolveFsCache = {};
  protected _allPaths = new Map<
    /* tsPath */
    string,
    Set</* fsPath */
    string>
  >();

  getFsPaths(): string[] {
    return Object.keys(this._fsPathTable);
  }

  constructor(
    protected fs: {
      isDir(path: string): Promise<boolean>;
      isFile(path: string): Promise<boolean>;
      // TODO: change to readFile
      readJsonFile(path: string): Promise<any>;
    }
  ) {
    //
  }

  createPathsWithBaseUrl(outDir: string): TsPathsWithBaseUrl {
    const paths = {};
    for (const [tsPath, fsPaths] of this._allPaths) {
      paths[tsPath] = fsPaths
        .toSeq()
        .map(fsPath => path.relative(outDir, path.resolve(outDir, fsPath)))
        .toArray();
    }
    return {
      baseUrl: ".",
      paths,
    };
  }

  resolveFsPath(tsPath: string) {
    return touchObject(this._resolveFsCache, tsPath, async () => {
      //

      for (const { prefix, suffix, path } of _findPath(
        this._tsPathTable,
        tsPath
      )) {
        const basePath = prefix + path + suffix;

        //
        if (await this.fs.isDir(basePath)) {
          for (const extension of [".ts", ".tsx"]) {
            const indexPath = join(basePath, "index" + extension);
            if (await this.fs.isFile(indexPath)) {
              return indexPath;
            }
          }
        }
        for (const extension of [".ts", ".tsx", ""]) {
          const path = basePath + extension;
          if (await this.fs.isFile(path)) {
            return path;
          }
        }
      }
    });
  }

  resolveTsPath(fsPath: string): string | undefined;
  resolveTsPath(fsPath: string, dir: string): string;
  resolveTsPath(fsPath: string, dir?: string) {
    fsPath = fsPath.replace(/([\\\/]index|)\.tsx?$/, "");
    for (const { prefix, suffix, path } of _findPath(
      this._fsPathTable,
      fsPath
    )) {
      return prefix + path.replace(/^[\\\/]+/, "") + suffix;
    }
    if (dir) {
      return path.posix.relative(dir, fsPath);
    }
  }

  async load(configPath: string) {
    const loadedConfigPaths = new Set();

    while (loadedConfigPaths.touch(configPath)) {
      const configDir = path.dirname(configPath);
      const config = await this.fs.readJsonFile(configPath);

      if (config?.compilerOptions?.paths) {
        const baseUrl = path.resolve(
          configDir,
          config.compilerOptions.baseUrl || "."
        );
        this.build(baseUrl, config.compilerOptions.paths);
        return;
      }
      if (typeof config?.extends === "string") {
        configPath = path.resolve(configDir, config.extends);
      }
    }
  }

  build(baseUrl: string, paths: Record<string, string[]>) {
    //

    for (const [tsPath, fsPaths] of entries(paths)) {
      const allFsPaths = this._allPaths.touch(tsPath, () => new Set());
      const [tsPrefix, tsSuffix] = _splitWillcard(tsPath);

      for (const fsPath of fsPaths) {
        allFsPaths.add(path.resolve(baseUrl, fsPath));

        const [fsPrefix, fsSuffix] = _splitWillcard(fsPath);
        let fsResolvedPrefix = path.resolve(baseUrl, fsPrefix);

        if (/[\\\/]$/.test(fsPrefix) && !/[\\\/]$/.test(fsResolvedPrefix)) {
          fsResolvedPrefix += fsPrefix.charAt(fsPrefix.length - 1);
        }

        _touchPathTable(this._tsPathTable, tsPrefix, tsSuffix).push([
          fsResolvedPrefix,
          fsSuffix,
        ]);

        _touchPathTable(this._fsPathTable, fsResolvedPrefix, fsSuffix).push([
          tsPrefix,
          tsSuffix,
        ]);
      }
    }
  }
}
function _splitWillcard(path: string): [prefix: string, suffix: string] {
  const pos = path.indexOf("*");
  return pos === -1 ? [path, ""] : [path.substr(0, pos), path.substr(pos + 1)];
}
function _touchPathTable(
  table: PathTable,
  prefix: string,
  suffix: string
): [string, string][] {
  return touchObject(
    touchObject(table, prefix, () => ({})),
    suffix,
    () => []
  );
}

function* _findPath(table: PathTable, path: string) {
  //
  for (const [prefix, suffixMap] of entries(table)) {
    if (!path.startsWith(prefix)) continue;
    let pathLessPrefix = path.substr(prefix.length);

    for (const [suffix, paths] of entries(suffixMap)) {
      if (!pathLessPrefix.endsWith(suffix)) continue;
      const pathLessSuffix = pathLessPrefix.substr(
        0,
        pathLessPrefix.length - suffix.length
      );
      for (const [prefix, suffix] of paths) {
        yield { prefix, suffix, path: pathLessSuffix };
      }
    }
  }
}
