import { AsyncProcess } from "@dabsi/common/async/AsyncProcess";
import { MapFactory } from "@dabsi/common/map/mapFactory";
import { Defined } from "@dabsi/common/patterns/Defined";
import { DABSI_DIR } from "@dabsi/env";
import { LoaderModule2 } from "@dabsi/modules2/LoaderModule2";
import { ProjectModule2 } from "@dabsi/modules2/ProjectModule2";
import { CliCommand } from "@dabsi/typecli";
import { Module } from "@dabsi/typemodule";
import { TsConfigPaths2 } from "@dabsi/typestack/TsConfigPaths2";
import path from "path";
import { Platform2 } from "./Platform2";

@Module({
  cli: "platform",
})
export class PlatformModule2 {
  constructor(
    protected loaderModule: LoaderModule2,
    protected projectModule: ProjectModule2,
    protected process: AsyncProcess
  ) {}

  readonly viewLibs = new Set<string>();

  protected _map = new Map<string, Platform2>();

  readonly platformConfigMap = new Map<string, { view: boolean }>();

  get(platformName: string): Platform2 {
    return this._map.touch(platformName, () => {
      const platform = new Platform2(platformName);

      this.loaderModule.pushLoader(
        () => `${this.constructor.name}.PlatformLoader<${platformName}>`,
        async dir => {
          const platformDir = path.join(dir, platformName);
          const platformTestsDir = path.join(platformDir, "tests");
          const [indexFile, testsFiles] = await Promise.all([
            //
            this.loaderModule.resolveIndexFile(platformDir),
            this.loaderModule
              .readDir(path.join(platformTestsDir))
              .catch(() => []),
          ]);

          (testsFiles.length || indexFile) &&
            platform.directories.add(platformDir);

          indexFile && platform.indexFileNames.add(indexFile);

          for (const testFile of testsFiles) {
            if (
              /tests\.tsx?$/i.test(testFile) ||
              /[\\\/]index\.tsx?$/i.test(testFile)
            ) {
              platform.testsFileNames.add(testFile);
            }
          }
        }
      );

      return platform;
    });
  }

  get commonPlatform(): Platform2 {
    return this.get("common");
  }

  get viewPlatform(): Platform2 {
    return this.get("view");
  }

  async generateCode(outDir: string, platformName: string) {
    const platforms = [
      this.commonPlatform,
      this.viewPlatform,
      this.get(platformName),
    ];
    // waiting for platform loaders.

    await this.process.wait();

    const indexCode: string[] = [
      `const l = m => { (typeof m.initmodule==="function") && m.initmodule(m)?.forEach(l) }`,
    ];
    const testsCode: string[] = [];

    for (const platform of platforms) {
      for (const code of [indexCode, testsCode]) {
        code.push(`/* ${platform.name} platform */`);
      }

      indexCode.push(
        ...platform.indexFileNames.toSeq().map(fsPath => {
          const tsPathCode = JSON.stringify(
            this.projectModule.paths.resolveTsPath(fsPath, outDir)
          );
          return `l(require(${tsPathCode}));`;
        })
      );

      testsCode.push(
        ...platform.testsFileNames.toSeq().map(fsPath => {
          const tsPathCode = JSON.stringify(
            this.projectModule.paths.resolveTsPath(fsPath, outDir)
          );
          return `describe(${tsPathCode}, ()=> { require(${tsPathCode}); });`;
        })
      );
    }

    const entityMap = {
      index: path.join(outDir, "index.ts"),
      tests: path.join(outDir, "tests.ts"),
    };
    return {
      entityMap,
      codeMap: {
        [entityMap.index]: indexCode.join("\n"),
        [entityMap.tests]: testsCode.join("\n"),
      },
    };
  }

  @CliCommand("make")
  async make({}, process: AsyncProcess) {
    const platforms: Platform2[] = [
      this.commonPlatform,
      this.viewPlatform,
      ...this.platformConfigMap.toSeq("keys").map(name => this.get(name)),
    ];

    const viewPlatforms = this.platformConfigMap
      .toSeq()
      .filter(x => x.view)
      .keySeq()
      .toSet();

    await process.wait();

    const fs = TsConfigPaths2.createFs();

    class Project {
      platformMap = new Map<Platform2, ProjectPlatform>();

      configsDir = path.join(this.dir, "configs");

      @Defined() paths!: TsConfigPaths2;
      @Defined() configsDirConfig!: any;

      constructor(public dir: string) {}
    }

    class ProjectPlatform {
      directories: string[] = [];

      devConfigFileName = path.join(
        this.project.configsDir,
        `tsconfig.dev.${this.platform.name}.json`
      );

      prodConfigFileName = path.join(
        this.project.configsDir,
        `tsconfig.prod.${this.platform.name}.json`
      );

      constructor(public project: Project, public platform: Platform2) {}
    }

    const libConfigsDir = path.join(DABSI_DIR, "configs");

    const makeJsonFile = (path: string, data: any) =>
      makeFile(path, JSON.stringify(data, null, 2));

    const makeFile = async (path: string, text: string) => {
      console.log("write file ", path);
      console.log("  " + text.replace(/\n/g, "\n  "));
    };

    const makeProject = async (project: Project) => {
      project.paths = new TsConfigPaths2(fs);
      await project.paths.load(path.join(project.dir, "tsconfig.json"));
      project.configsDirConfig = project.paths.createConfig(project.configsDir);
      await Promise.all([
        makeJsonFile(path.join(project.configsDir, "tsconfig.server.json"), {
          extends: path.join(
            path.relative(project.configsDir, libConfigsDir),
            `tsconfig.base.server.json`
          ),
          include: [
            ...project.paths
              .getFsPaths()
              .toSeq()
              .map(fsPath => path.relative(project.configsDir, fsPath)),
          ],
          exclude: ["**/view", ...viewPlatforms.toSeq().map(p => `**/${p}`)],
        }),
        Promise.all(
          project.platformMap.toSeq("values").map(p => makeProjectPlatform(p))
        ),
      ]);
    };

    const makeProjectPlatform = ({
      project,
      platform,
      devConfigFileName,
      prodConfigFileName,
      directories,
    }: ProjectPlatform) => {
      const baseConfig = {
        extends: path.join(
          path.relative(project.configsDir, libConfigsDir),
          `tsconfig.base.${platform.name}.json`
        ),
        compilerOptions: project.configsDirConfig,
      };
      return Promise.all([
        makeJsonFile(prodConfigFileName, {
          ...baseConfig,
          include: directories.map(fsPath =>
            path.relative(project.configsDir, fsPath)
          ),
        }),
        makeJsonFile(devConfigFileName, {
          ...baseConfig,
          include: [
            ...project.paths
              .getFsPaths()
              .toSeq()
              .map(fsPath => path.posix.relative(project.configsDir, fsPath))
              .flatMap(fsPath =>
                [
                  ...(platform.name !== "common" ? ["**/common"] : []),

                  ...(viewPlatforms.has(platform.name) ? ["**/view"] : []),

                  `**/${platform.name}`,
                ]
                  .toSeq()
                  .map(x => path.posix.join(fsPath, x))
              )
              .toSet(),
            ...(viewPlatforms.has(platform.name)
              ? this.viewLibs
                  .toSeq()
                  .map(fsPath => path.relative(project.configsDir, fsPath))
              : []),
          ],
        }),
        Promise.all(
          directories.map(async dir => {
            await makeJsonFile(path.join(dir, "tsconfig.json"), {
              extends: path.posix.relative(dir, devConfigFileName),
            });
          })
        ),
      ]);
    };

    const projectMap = new Map<string, Project>();

    for (const platform of platforms) {
      for (const dir of platform.directories) {
        const projectDir = dir.split(/[\\\/]+src[\\\/]+/, 1)[0];

        const project = projectMap.touch(
          projectDir,
          () => new Project(projectDir)
        );
        project.platformMap
          .touch(platform, () => new ProjectPlatform(project, platform))
          .directories.push(dir);
      }
    }

    await Promise.all(
      projectMap.toSeq("values").map(project => makeProject(project))
    );
  }
}