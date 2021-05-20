// TODO: fix make when no have platofrm folders under src/ - expect to make tsconfigs
import fs from "fs";
import { AsyncProcess2 } from "@dabsi/common/async/AsyncProcess2";
import { Defined } from "@dabsi/common/patterns/Defined";
import { DABSI_DIR } from "@dabsi/env";
import { LoaderModule2 } from "@dabsi/modules2/LoaderModule2";
import { ProjectModule2 } from "@dabsi/modules2/ProjectModule2";
import { CliCommand } from "@dabsi/typecli";
import { Module } from "@dabsi/typemodule";
import {
  TsConfigPaths2,
  TsPathsWithBaseUrl,
} from "@dabsi/typestack/TsConfigPaths2";
import path from "path";
import { Platform2 } from "./Platform2";
import { Record } from "immutable";
import MakeModule from "@dabsi/modules2/MakeModule";

@Module({
  cli: "platform",
})
export class PlatformModule2 {
  constructor(
    protected loaderModule: LoaderModule2,
    protected projectModule: ProjectModule2,
    protected process: AsyncProcess2,
    protected makeModule: MakeModule
  ) {}

  readonly viewLibs = new Set<string>();

  readonly serverLibs = new Set<string>();

  protected _map = new Map<string, Platform2>();
  protected _platformMap = new Map<string, Platform2>();

  getPlatform(name: string) {
    return this._platformMap.touch(
      name,
      () => new Platform2(name, this.loaderModule)
    );
  }

  readonly platformConfigMap = new Map<string, { view: boolean }>();

  // TODO: Once() getViewPlatform

  async generateCode(outDir: string, platformName: string, sharedCode = "") {
    const platform = this.getPlatform(platformName);

    platform.settings.includeInternalFiles = true;

    const platforms: Platform2[] = [
      this.getPlatform("common"),
      this.getPlatform("view"),
      platform,
    ];

    await Promise.all(platforms.toSeq().map(p => p.load()));

    const indexCode: string[] = [
      `const l = m => { (typeof m.initmodule==="function") && m.initmodule(m)?.forEach(l) }`,
    ];
    const testsCode: string[] = [];

    for (const platform of platforms) {
      for (const code of [indexCode, testsCode]) {
        sharedCode && code.push(sharedCode);
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
  async make() {
    const platforms: Platform2[] = await Promise.all([
      this.getPlatform("common"),
      this.getPlatform("view"),
      ...this.platformConfigMap
        .toSeq("keys")
        .map(name => this.getPlatform(name)),
    ]);

    await Promise.all(platforms.toSeq().map(p => p.load()));

    const viewPlatforms = this.platformConfigMap
      .toSeq()
      .filter(x => x.view)
      .keySeq()
      .toSet();

    const cfs = TsConfigPaths2.createFs();

    class Project {
      platformMap = new Map<Platform2, ProjectPlatform>();
      configsDir = path.join(this.dir, "configs");

      @Defined() paths!: TsConfigPaths2;
      @Defined() pathsWithBaseUrl!: TsPathsWithBaseUrl;

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

    const makeProject = async (project: Project) => {
      project.paths = new TsConfigPaths2(cfs);
      await project.paths.load(path.join(project.dir, "tsconfig.json"));

      await fs.promises.mkdir(project.configsDir, { recursive: true });

      project.pathsWithBaseUrl = project.paths.createPathsWithBaseUrl(
        project.configsDir
      );

      await Promise.all([
        this.makeModule.makeJsonFile(
          path.join(project.configsDir, "tsconfig.server.json"),
          {
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
          }
        ),
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
        compilerOptions: project.pathsWithBaseUrl,
      };
      return Promise.all([
        this.makeModule.makeJsonFile(prodConfigFileName, {
          ...baseConfig,
          include: directories.map(fsPath =>
            path.relative(project.configsDir, fsPath)
          ),
        }),
        this.makeModule.makeJsonFile(devConfigFileName, {
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
            await this.makeModule.makeJsonFile(
              path.join(dir, "tsconfig.json"),
              {
                extends: path.posix.relative(dir, devConfigFileName),
              }
            );
          })
        ),
      ]);
    };

    const projectMap = new Map<string, Project>();

    for (const platform of platforms) {
      for (const dir of platform.directories) {
        console.log({ dir });

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

    console.log("making", { projectMap });
    await Promise.all(
      projectMap.toSeq("values").map(project => makeProject(project))
    );
  }
}
