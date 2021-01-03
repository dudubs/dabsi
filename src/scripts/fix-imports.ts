import { Timeout } from "@dabsi/common/async/Timeout";
import replaceAsync from "@dabsi/common/string/replaceAsync";
import { readdirRecursiveSync } from "@dabsi/filesystem/readdirRecursiveSync";
import { inspect } from "@dabsi/logging/inspect";
import { getTsConfigPaths } from "@dabsi/typestack/getTsConfigPaths";
import TsConfigPaths from "@dabsi/typestack/TsConfigPaths";
import fs, { existsSync, readFileSync, realpathSync } from "fs";
import path from "path";

function findTsConfigPath(startDir: string) {
  let dir = startDir;
  while (dir) {
    const tsConfigPath = path.join(dir, "tsconfig.json");
    if (existsSync(tsConfigPath)) {
      return tsConfigPath;
    }
    const nextDir = path.dirname(dir);
    if (nextDir === dir) break;
    dir = nextDir;
  }
  throw new Error(`No tsconfig.json for ${startDir}`);
}

export default async function ({ write, args: [srcDir] }) {
  srcDir = realpathSync(srcDir);

  const tsConfigPath = findTsConfigPath(srcDir);
  const tsConfigDir = path.dirname(tsConfigPath);

  const tsConfigPaths = await getTsConfigPaths(
    tsConfigPath,
    async path => JSON.parse(await fs.promises.readFile(path, "utf8")),
    isFile,
    isDir
  );

  function isFile(path: string) {
    return fs.promises
      .stat(path)
      .then(stat => stat.isFile())
      .catch(() => false);
  }

  function isDir(path: string) {
    return fs.promises
      .stat(path)
      .then(stat => stat.isDirectory())
      .catch(() => false);
  }
  async function resolveFsPath(fsPath: string) {
    if (await isDir(fsPath)) {
      for (const baseName of ["index.ts", "index.tsx"]) {
        const fileName = path.join(fsPath, baseName);
        if (await isFile(fileName)) {
          return fileName;
        }
      }
    }
    for (const suffix of [".ts", ".tsx", ""]) {
      const fileName = path + suffix;
      if (await isFile(fileName)) {
        return fileName;
      }
    }
  }

  let debug = 0;
  for (const fileName of readdirRecursiveSync(srcDir)) {
    const fileSource = readFileSync(fileName, "utf8");
    const fileDir = path.dirname(fileName);

    const fileOutSource = await replaceAsync(
      /(?<start>^.*)(?<type>import|from|module) "(?<path>[^"\n]+)"(?<end>\;\r?\n|\s+\{})/g,
      fileSource,
      async ({ 0: text, groups: { type, path: importPath, end, start } }) => {
        const fixedPath = importPath;
        if (text !== `${start}${type} "${importPath}"${end}`) {
          console.log(
            { type, importPath },
            text === `${type} "${importPath}"${end}`
          );
        }
        let fsPath: string | undefined;
        if (importPath.startsWith(".")) {
          fsPath = await resolveFsPath(path.resolve(fileDir, importPath));
        } else {
          fsPath = await tsConfigPaths.getFsPath(importPath);
        }

        if (!fsPath) {
          // TODO: check in node_modules
          return text;
        }

        if (fsPath.startsWith(fileDir)) {
          importPath =
            "." +
            fsPath.slice(fileDir.length).replace(/([\\\/]index|)\.tsx?$/, "");
        } else {
          importPath = tsConfigPaths.getTsPath(fsPath);
        }

        if (!importPath) {
          importPath = fixedPath;
        }

        if (fixedPath !== importPath) {
          console.log(
            `Fix "${fixedPath}" to "${importPath}" at ${path.relative(
              srcDir,
              fileName
            )}.`
          );
        }

        return `${start}${type} "${importPath}"${end}`;
      }
    );

    if (fileOutSource === fileSource) continue;

    if (write) await fs.promises.writeFile(fileName, fileOutSource);

    // for (const x of fileSource.matchAll(
    //   /(?<type>import|from|module) "(?<path>[^"\n]+)"/g
    // )) {
    //   console.log({ x });
    // }

    // const fileFixedSource = fileSource.replace(
    //   /(?<type>import|from|module) "(?<path>[^"\n]+)"/g,
    //   (...args) => {
    //     const { type, path: originalImportPath } = args[args.length - 1] as {
    //       path: string;
    //       type: "import" | "from";
    //     };

    //     let importPath = originalImportPath;

    //     if (importPath.startsWith(".")) {
    //       const importRelativePath = importPath;
    //       const importAbsolutePath = path.resolve(fileDir, importRelativePath);
    //       if (importAbsolutePath.startsWith(DABSI_SRC_PATH)) {
    //         importPath =
    //           "@dabsi/" +
    //           importAbsolutePath
    //             .slice(DABSI_SRC_PATH.length + 1)
    //             .replace(/\\/g, "/");
    //       }

    //       if (importPath !== originalImportPath) {
    //         console.log(`Fix "${originalImportPath}" to "${importPath}"`);
    //       }
    //     }
    //     return `${type} "${importPath}"`;
    //   }
    // );

    // if (write && fileFixedSource !== fileSource) {
    //   // writeFileSync(fileName, fileFixedSource);
    // }
  }
}
