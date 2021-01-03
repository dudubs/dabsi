import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import { entries } from "@dabsi/common/object/entries";
import { mapObject } from "@dabsi/common/object/mapObject";
import { touchObject } from "@dabsi/common/object/touchObject";
import { relativePosixPath } from "@dabsi/modules/pathHelpers";
import { readFileSync } from "fs";
import path from "path";

function getConfigPaths(fileName: string) {
  const text = readFileSync(fileName, "utf8");
  const config = JSON.parse(text);

  const co = config?.compilerOptions;
  if (co?.paths) {
    const baseUrl = path.resolve(path.dirname(fileName), co.baseUrl);
    return mapObject(co.paths as Record<string, string[]>, tsPaths =>
      tsPaths.map(tsPath => path.resolve(baseUrl, tsPath))
    );
  }
  if (typeof config?.extends === "string") {
    return getConfigPaths(path.resolve(path.dirname(fileName), config.extends));
  }
}

export type TsConfigPaths = ReturnType<typeof createTsConfigPaths>;

export default function createTsConfigPaths(
  configDir: string,
  baseUrl: string,
  paths: Record<string, string[]>,
  isFile: (path: string) => Promise<boolean>
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

  return {
    async getFsPath(tsPath: string) {
      for (const fsPath of findFsPath(tsPath)) {
        if (await isFile(fsPath)) {
          return fsPath;
        }
      }
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

  function* findFsPath(tsPath: string) {
    for (const p of find(tsPrefixMap, tsPath)) {
      const fileName = p.prefix + p.path + p.suffix;
      for (const suffix of [".ts", ".tsx"]) {
        for (const baseName of ["", "index"]) {
          yield path.join(fileName, baseName) + suffix;
        }
      }
    }
  }

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
