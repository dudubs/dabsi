import { DABSI_DIR, DABSI_ROOT_DIR } from "@dabsi/env";
import { relativePosixPath } from "@dabsi/modules/pathHelpers";
import { getProjectDir } from "@dabsi/typestack/ProjectModule";
import { TsConfigPathsSync } from "@dabsi/typestack/TsConfigPathsSync";
import fs, {
  existsSync,
  readdirSync,
  readFileSync,
  realpathSync,
  statSync,
} from "fs";
import path from "path";

export default async function ({ projectDir = ".", force = false }) {
  projectDir = realpathSync(projectDir);
  const promises: any[] = [];
  const makedProjectDirs = new Set();

  //   makeProject(path.join(DABSI_ROOT_DIR, "test-projects", "test-system"));

  makeProject(projectDir);

  function makeProject(projectDir) {
    if (!makedProjectDirs.touch(projectDir)) return;

    const configsDir = path.join(projectDir, "configs");
    const configFileName = path.join(projectDir, "tsconfig.json");

    const configPaths = TsConfigPathsSync.fromFile(
      configFileName,
      path => JSON.parse(readFileSync(path, "utf8")),
      path => statSync(path).isFile(),
      path => statSync(path).isDirectory()
    );

    //   makeRootConfigs();
    const parentProjectDirs = configPaths.fsPaths
      .toSeq()
      .map(getProjectDir)
      .toSet()
      .toArray();

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
        .map(dir => relativePosixPath(configsDir, path.join(dir, "src")))
        .toArray();
      makeJsonFile(path.join(configsDir, "tsconfig.server.json"), {
        extends: relativePosixPath(
          configsDir,
          path.join(DABSI_DIR, "configs", "tsconfig.base.server.json")
        ),
        compilerOptions: {
          ...configPaths.getConfigForDir(configsDir),
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
        extends: relativePosixPath(
          configsDir,
          path.join(DABSI_DIR, "configs", `tsconfig.base.${platform}.json`)
        ),
        compilerOptions: {
          ...configPaths.getConfigForDir(configsDir),
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
          relativePosixPath(configsDir, path.join(projectDir, "**", platform))
        );
      }
    }

    function makeFile(outFileName, content: string) {
      if (!force && existsSync(outFileName)) return;
      console.log(`make "${path.relative(DABSI_ROOT_DIR, outFileName)}"`);
      // console.log("\t" + content.replace(/\n/g, "\n\t"));
      promises.push(fs.promises.writeFile(outFileName, content, "utf8"));
    }

    function makeJsonFile(outFileName, content: any) {
      makeFile(outFileName, JSON.stringify(content, null, 2));
    }

    function makeModuleConfig(platform: string, platformDir: string) {
      makeJsonFile(path.join(platformDir, "tsconfig.json"), {
        extends: relativePosixPath(
          platformDir,
          path.join(configsDir, `tsconfig.${platform}.json`)
        ),
      });
    }

    function scanModules(dir: string) {
      for (const baseName of readdirSync(dir)) {
        const fileName = path.join(dir, baseName);
        if (platforms.has(baseName)) {
          if (getIndexFile(fileName)) {
            makeModuleConfig(baseName, fileName);
            continue;
          }
        }

        if (!statSync(fileName).isDirectory()) continue;
        scanModules(fileName);
      }
      function getIndexFile(dir: string) {
        for (const baseName of ["index.ts", "index.tsx"]) {
          const fileName = path.join(dir, baseName);
          if (existsSync(fileName)) return fileName;
        }
      }
    }
  }
}