import { DABSI_DIR, DABSI_WORKSPACE_DIR } from "@dabsi/env";

import { TsConfigPaths2 } from "@dabsi/typestack/TsConfigPaths2";
import fs, { existsSync, readdirSync, realpathSync, statSync } from "fs";
import path from "path";

export default async function ({ projectDir = ".", force = false }) {
  //   throw new Error("TODO: add view* files to client");
  //   throw new Error("TODO: add common* files to view/client");

  projectDir = realpathSync(projectDir);
  const promises: any[] = [];
  const makedProjectDirs = new Set();

  //   makeProject(path.join(DABSI_WORKSPACE_DIR, "test-projects", "test-system"));

  makeProject(projectDir);

  async function makeProject(projectDir) {
    if (!makedProjectDirs.touch(projectDir)) return;

    const configsDir = path.join(projectDir, "configs");
    const configFileName = path.join(projectDir, "tsconfig.json");

    const configPaths = new TsConfigPaths2({
      readJsonFile: async path => require(path),
      isFile: path =>
        fs.promises
          .stat(path)
          .then(stat => stat.isFile())
          .catch(() => false),
      isDir: path =>
        fs.promises
          .stat(path)
          .then(stat => stat.isDirectory())
          .catch(() => false),
    });

    await configPaths.load(configFileName);

    //   makeRootConfigs();
    const parentProjectDirs = configPaths
      .getFsPaths()
      .toSeq()
      .flatMap(path => {
        const pathLessSrc = path.split(/[\\\/]+src[\\\/]*/, 1)[0];
        console.log({ path, pathLessSrc });

        return pathLessSrc.length === path.length ? [] : [pathLessSrc];
      })
      .toSet();

    console.log({ x: [...parentProjectDirs] });
    return;

    for (const projectDir of parentProjectDirs) {
      makeProject(projectDir);
    }

    const platforms = new Set(["common", "view", "browser"]);

    const clientPlatforms = [
      "view",
      "browser",
      // feature: "native"
    ];
    makePlatformConfig("common");
    makePlatformConfig("view");
    makePlatformConfig("browser", ["common", "view"]);
    // feature: makePlatformConfig("native", ["common", "view"]);

    scanModules(path.join(projectDir, "src"));

    makeServerConfig();

    function makeServerConfig() {
      const include = [...parentProjectDirs, projectDir]
        .toSeq()
        .map(dir => path.posix.relative(configsDir, path.join(dir, "src")))
        .toArray();
      makeJsonFile(path.join(configsDir, "tsconfig.server.json"), {
        extends: path.posix.relative(
          configsDir,
          path.join(DABSI_DIR, "configs", "tsconfig.base.server.json")
        ),
        compilerOptions: {
          ...configPaths.createPathsWithBaseUrl(configsDir),
        },
        include,
        exclude: include
          .toSeq()
          .flatMap(dir =>
            clientPlatforms.map(platform =>
              path.posix.join(dir, "**", platform)
            )
          )
          .toSet()
          .toArray(),
      });
    }

    function makePlatformConfig(
      platform: string,
      parentPlatforms: string[] = []
    ) {
      const prodConfig = {
        extends: path.posix.relative(
          configsDir,
          path.join(DABSI_DIR, "configs", `tsconfig.base.${platform}.json`)
        ),
        compilerOptions: {
          ...configPaths.createPathsWithBaseUrl(configsDir),
        },
        include: getIncludes(projectDir).toSeq().toSet().toArray(),
      };

      makeJsonFile(path.join(configsDir, `tsconfig.${platform}.json`), {
        ...prodConfig,
        include: [
          ...parentProjectDirs.flatMap(projectDir => getIncludes(projectDir)),
          ...prodConfig.include,
        ]
          .toSeq()
          .toSet()
          .toArray(),
      });

      parentPlatforms.length &&
        makeJsonFile(
          path.join(configsDir, `tsconfig.prod.${platform}.json`),
          prodConfig
        );
      function getIncludes(projectDir) {
        return [...parentPlatforms, platform].map(platform =>
          path.posix.relative(configsDir, path.join(projectDir, "**", platform))
        );
      }
    }

    function makeFile(outFileName, content: string) {
      if (!force && existsSync(outFileName)) return;
      console.log(`make "${path.relative(DABSI_WORKSPACE_DIR, outFileName)}"`);
      console.log("\t" + content.replace(/\n/g, "\n\t"));
      //   promises.push(fs.promises.writeFile(outFileName, content, "utf8"));
    }

    function makeJsonFile(outFileName, content: any) {
      makeFile(outFileName, JSON.stringify(content, null, 2));
    }

    function makeModuleConfig(platform: string, platformDir: string) {
      makeJsonFile(path.join(platformDir, "tsconfig.json"), {
        extends: path.posix.relative(
          platformDir,
          path.join(configsDir, `tsconfig.${platform}.json`)
        ),
      });
    }

    function scanModules(dir: string) {
      for (const baseName of readdirSync(dir)) {
        const fileName = path.join(dir, baseName);
        if (platforms.has(baseName)) {
          if (findIndexFileName(fileName)) {
            makeModuleConfig(baseName, fileName);
            continue;
          }
        }

        if (!statSync(fileName).isDirectory()) continue;
        scanModules(fileName);
      }
      function findIndexFileName(dir: string) {
        for (const baseName of ["index.ts", "index.tsx"]) {
          const fileName = path.join(dir, baseName);
          if (existsSync(fileName)) return fileName;
        }
      }
    }
  }
}
