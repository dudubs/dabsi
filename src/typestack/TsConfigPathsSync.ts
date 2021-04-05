import { entries } from "@dabsi/common/object/entries";
import { mapObject } from "@dabsi/common/object/mapObject";
import { touchObject } from "@dabsi/common/object/touchObject";
import { relativePosixPath } from "@dabsi/modules/pathHelpers";
import path from "path";

export type TsConfigPathsSync = ReturnType<typeof TsConfigPathsSync>;

export function TsConfigPathsSync(
  configDir: string,
  baseUrl: string,
  paths: Record<string, string[]>,
  isFile: (path: string) => boolean,
  isDir: (path: string) => boolean
) {
  configDir = path.resolve(configDir, baseUrl);

  type PrefixMap = Record<
    string,
    Record<string, [prefix: string, suffix: string][]>
  >;

  const tsPrefixMap: PrefixMap = {};

  const fsPrefixMap: PrefixMap = {};

  for (const p of parse()) {
    add(tsPrefixMap, p.ts, p.fs);
    add(fsPrefixMap, p.fs, p.ts);
  }

  const getFsPathCache = {};

  return {
    fsPaths: Object.keys(fsPrefixMap),
    getFsPath(tsPath: string) {
      return touchObject(getFsPathCache, tsPath, async () => {
        for (const p of find(tsPrefixMap, tsPath)) {
          const basePath = p.prefix + p.path + p.suffix;

          if (isDir(basePath)) {
            for (const baseName of ["index.ts", "index.tsx"]) {
              const indexFileName = path.join(basePath, baseName);
              if (isFile(indexFileName)) {
                return indexFileName;
              }
            }
            return basePath;
          }
          for (const suffix of [".ts", ".tsx", ""]) {
            const fileName = basePath + suffix;

            if (isFile(fileName)) {
              return fileName;
            }
          }
        }
      });
    },
    getTsPath(fsPath: string, dir?: string) {
      fsPath = fsPath.replace(/([\\\/]index|)\.tsx?$/, "");
      for (const p of find(fsPrefixMap, fsPath)) {
        return p.prefix + p.path + p.suffix;
      }
      if (dir) {
        return relativePosixPath(dir, fsPath);
      }
    },
    getConfigForDir(dir: string) {
      return {
        baseUrl: ".",
        paths: mapObject(paths, (fsPaths, tsPath) => {
          return fsPaths.map(fsPath => {
            return relativePosixPath(dir, path.resolve(configDir, fsPath));
          });
        }),
      };
    },
  };

  function* find(prefixMap: PrefixMap, path: string) {
    for (const [prefix, suffixMap] of entries(prefixMap)) {
      if (!path.startsWith(prefix)) continue;
      const pathWithoutPrefix = path.slice(prefix.length);
      for (const [suffix, paths] of entries(suffixMap)) {
        if (!pathWithoutPrefix.endsWith(suffix)) continue;
        const pathWithoutSuffix = pathWithoutPrefix.slice(
          0,
          pathWithoutPrefix.length - suffix.length
        );
        for (const [prefix, suffix] of paths) {
          yield { prefix, suffix, path: pathWithoutSuffix };
        }
      }
    }
  }

  function add(prefixMap, key: { prefix; suffix }, value: { prefix; suffix }) {
    const suffixMap = touchObject(prefixMap, key.prefix, () => ({}));
    const paths = touchObject(
      suffixMap,
      key.suffix,
      () => [] as [string, string][]
    );
    paths.push([value.prefix, value.suffix]);
  }

  function* parse() {
    for (const [tsPath, fsPaths] of entries(paths)) {
      const [tsPrefix, tsSuffix = ""] = tsPath.split("*", 1) as [
        string,
        string?
      ];
      const ts = { prefix: tsPrefix, suffix: tsSuffix };
      for (const fsPath of fsPaths) {
        const [fsPrefix, fsSuffix = ""] = fsPath.split("*", 1) as [
          string,
          string?
        ];

        yield {
          ts,
          fs: {
            prefix:
              path.resolve(configDir, fsPrefix) +
              (/[\\\/]$/.test(fsPrefix) ? "/" : ""),
            suffix: fsSuffix,
          },
        };
      }
    }
  }
}

TsConfigPathsSync.fromFile = function getTsConfigPaths(
  tsConfigPath: string,
  readJsonFile: (path: string) => any,
  isFile: (path: string) => boolean,
  isDir: (path: string) => boolean
): TsConfigPathsSync {
  const tsConfig = readJsonFile(tsConfigPath);
  const co = tsConfig?.compilerOptions;
  const tsConfigDir = path.dirname(tsConfigPath);
  if (co?.paths) {
    return TsConfigPathsSync(tsConfigDir, co.baseUrl, co.paths, isFile, isDir);
  }
  if (tsConfig?.extends) {
    return getTsConfigPaths(
      path.resolve(tsConfigDir, tsConfig.extends),
      readJsonFile,
      isFile,
      isDir
    );
  }
  // default
  return TsConfigPathsSync(tsConfigDir, ".", {}, isFile, isDir);
};
