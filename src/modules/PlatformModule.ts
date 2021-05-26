// TODO: fix make when no have platofrm folders under src/ - expect to make tsconfigs
import { Defined } from "@dabsi/common/patterns/Defined";
import { DABSI_DIR } from "@dabsi/env";
import LoaderModule from "@dabsi/modules/LoaderModule";
import MakeModule from "@dabsi/modules/MakeModule";
import ProjectModule from "@dabsi/modules/ProjectModule";
import { CliCommand } from "@dabsi/typecli";
import { Module } from "@dabsi/typemodule";
import {
  TsConfigPaths2,
  TsPathsWithBaseUrl,
} from "@dabsi/typestack/TsConfigPaths2";
import fs from "fs";
import path from "path";
import Platform from "./Platform";

@Module({
  cli: "platform",
})
export default class PlatformModule {
  constructor(
    protected loaderModule: LoaderModule,
    protected projectModule: ProjectModule,
    protected makeModule: MakeModule
  ) {}

  readonly viewLibs = new Set<string>();

  readonly serverLibs = new Set<string>();

  protected _platformMap = new Map<string, Platform>();

  commonPlatform = this.getPlatform("common");

  viewPlatform = this.getPlatform("view");

  getPlatform(name: string) {
    return this._platformMap.touch(
      name,
      () => new Platform(name, this.loaderModule)
    );
  }

  @CliCommand("make")
  async make() {
    const platforms: Platform[] = Object.values(this._platformMap);

    await Promise.all(platforms.toSeq().map(p => p.load()));

    const cfs = TsConfigPaths2.createFs();

    class Project {
      platformMap = new Map<Platform, ProjectPlatform>();
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

      constructor(public project: Project, public platform: Platform) {}
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
            exclude: [
              "**/view",
              //
              ...platforms
                .filter(p => p.settings.isViewPlatform)
                .toSeq()
                .map(p => `**/${p.name}`),
            ],
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

                  ...(platform.settings.isViewPlatform ? ["**/view"] : []),

                  `**/${platform.name}`,
                ]
                  .toSeq()
                  .map(x => path.posix.join(fsPath, x))
              )
              .toSet(),
            ...(platform.settings.isViewPlatform
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
      console.log({ platform });

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

    await Promise.all(
      projectMap.toSeq("values").map(project => makeProject(project))
    );
  }

  async makeSourceFile(
    outFileName: string,
    includeFileNames: string[],
    getIncludeCode: (escapedTsPath: string) => string,
    code = ""
  ) {
    const outDir = path.dirname(outFileName);
    return this.makeModule.makeTextFile(
      outFileName,
      code +
        (
          await Promise.all(
            includeFileNames.toSeq().map(async fsPath => {
              const escapedTsPath = JSON.stringify(
                await this.projectModule.paths.resolveTsPath(fsPath, outDir)
              );
              return getIncludeCode(escapedTsPath);
            })
          )
        ).join("\n")
    );
  }

  async makeIndexFile(outFileName, indexFileNames: string[], code = "") {
    return this.makeSourceFile(
      outFileName,
      indexFileNames,
      escapedTsPath => `import ${escapedTsPath};`,
      code
    );
  }

  async makeTestsFile(
    outFileName: string,
    testsFileNames: string[],
    code = ""
  ) {
    return this.makeSourceFile(
      outFileName,
      testsFileNames,
      escapedTsPath =>
        `describe(${escapedTsPath},()=> { require(${escapedTsPath}); });`,
      code
    );
  }

  async makeFiles(outDir: string, platforms: Platform[], commonCode: string) {
    const testsFileName = path.join(outDir, "tests.ts");
    const indexFileName = path.join(outDir, "index.ts");

    await Promise.all([
      this.makeTestsFile(
        testsFileName,
        platforms.flatMap(p => p.testsFileNames),
        commonCode
      ),
      this.makeIndexFile(
        indexFileName,
        platforms.flatMap(p => p.indexFileNames),
        commonCode
      ),
    ]);
    return { testsFileName, indexFileName };
  }
}
