// TODO: fix make when no have platofrm folders under src/ - expect to make tsconfigs
import { DABSI_DIR } from "@dabsi/env";
import LoaderModule from "@dabsi/modules/LoaderModule";
import MakeModule from "@dabsi/modules/MakeModule";
import { ProjectDependency } from "@dabsi/modules/ProjectDependency";
import ProjectModule from "@dabsi/modules/ProjectModule";
import { CliCommand } from "@dabsi/typecli";
import { Module } from "@dabsi/typemodule";
import { Seq } from "immutable4";
import { entries } from "lodash";
import path from "path";
import Platform from "./Platform";

const DISABLE_SRC_CONFIGS = false;

const DISABLE_DEV_CONFIGS = false;

const DISABLE_DEEP_MAKE = false;

for (const [k, v] of entries({
  DISABLE_DEV_CONFIGS,
  DISABLE_SRC_CONFIGS,
  DISABLE_DEEP_MAKE,
})) {
  v && console.warn(k);
}

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

  readonly commonPlatform = this.getPlatform("common");

  readonly viewPlatform = this.getPlatform("view");

  getPlatform(name: string) {
    return this._platformMap.touch(
      name,
      () => new Platform(name, this.loaderModule)
    );
  }

  // @CliCommand("make")
  // async makeOld() {
  //   const platforms: Platform[] = Object.values(this._platformMap);

  //   await Promise.all(platforms.toSeq().map(p => p.load()));

  //   const cfs = TsConfigPaths2.createFs();

  //   class Project {
  //     platformMap = new Map<Platform, ProjectPlatform>();
  //     configsDir = path.join(this.dir, "configs");

  //     @Defined() paths!: TsConfigPaths2;
  //     @Defined() pathsWithBaseUrl!: TsPathsWithBaseUrl;

  //     constructor(public dir: string) {}
  //   }

  //   class ProjectPlatform {
  //     directories: string[] = [];

  //     devConfigFileName = path.join(
  //       this.project.configsDir,
  //       `tsconfig.${this.platform.name}.dev.json`
  //     );

  //     constructor(public project: Project, public platform: Platform) {}
  //   }

  //   const libConfigsDir = path.join(DABSI_DIR, "configs");

  //   const makeProject = async (project: Project) => {
  //     project.paths = new TsConfigPaths2(cfs);
  //     await project.paths.load(path.join(project.dir, "tsconfig.json"));

  //     await fs.promises.mkdir(project.configsDir, { recursive: true });

  //     project.pathsWithBaseUrl = project.paths.createPathsWithBaseUrl(
  //       project.configsDir
  //     );

  //     await Promise.all([
  //       this.makeModule.makeJsonFile(
  //         path.join(project.configsDir, "tsconfig.server.json"),
  //         {
  //           extends: path.join(
  //             path.relative(project.configsDir, libConfigsDir),
  //             `tsconfig.server.base.json`
  //           ),
  //           include: [
  //             ...project.paths
  //               .getFsPaths()
  //               .toSeq()
  //               .map(fsPath => path.relative(project.configsDir, fsPath)),
  //           ],
  //           exclude: [
  //             "**/view",
  //             //
  //             ...platforms
  //               .filter(p => p.settings.isViewPlatform)
  //               .toSeq()
  //               .map(p => `**/${p.name}`),
  //           ],
  //         }
  //       ),
  //       Promise.all(
  //         project.platformMap.toSeq("values").map(p => makeProjectPlatform(p))
  //       ),
  //     ]);
  //   };

  //   const makeProjectPlatform = ({
  //     project,
  //     platform,
  //     devConfigFileName,
  //     directories,
  //   }: ProjectPlatform) => {
  //     const baseConfig = {
  //       extends: path.join(
  //         path.relative(project.configsDir, libConfigsDir),
  //         `tsconfig.base.${platform.name}.json`
  //       ),
  //       compilerOptions: project.pathsWithBaseUrl,
  //     };

  //     return Promise.all([
  //       this.makeModule.makeJsonFile(devConfigFileName, {
  //         ...baseConfig,
  //         include: [
  //           ...project.paths
  //             .getFsPaths()
  //             .toSeq()
  //             .map(fsPath => path.posix.relative(project.configsDir, fsPath))
  //             .flatMap(fsPath =>
  //               [
  //                 ...(platform.name !== "common" ? ["**/common"] : []),

  //                 ...(platform.settings.isViewPlatform ? ["**/view"] : []),

  //                 `**/${platform.name}`,
  //               ]
  //                 .toSeq()
  //                 .map(x => path.posix.join(fsPath, x))
  //             )
  //             .toSet(),
  //           ...(platform.settings.isViewPlatform
  //             ? this.viewLibs
  //                 .toSeq()
  //                 .map(fsPath => path.relative(project.configsDir, fsPath))
  //             : []),
  //         ],
  //       }),
  //       Promise.all(
  //         directories.map(async dir => {
  //           await this.makeModule.makeJsonFile(
  //             path.join(dir, "tsconfig.json"),
  //             {
  //               extends: path.posix.relative(dir, devConfigFileName),
  //             }
  //           );
  //         })
  //       ),
  //     ]);
  //   };

  //   const projectDependencyMap = new Map<string, Project>();

  //   for (const platform of platforms) {
  //     console.log({ platform });

  //     for (const dir of platform.directories) {
  //       console.log({ dir });

  //       const projectDir = dir.split(/[\\\/]+src[\\\/]+/, 1)[0];

  //       const project = projectDependencyMap.touch(
  //         projectDir,
  //         () => new Project(projectDir)
  //       );
  //       project.platformMap
  //         .touch(platform, () => new ProjectPlatform(project, platform))
  //         .directories.push(dir);
  //     }
  //   }

  //   await Promise.all(
  //     projectDependencyMap.toSeq("values").map(project => makeProject(project))
  //   );
  // }

  @CliCommand("make")
  async make() {
    await Promise.all([
      this.makeServerConfigs(),
      this.makePlatformConfigs("common", []),
      this.makePlatformConfigs("view", ["common"]),
      Promise.all(
        this._platformMap
          .toSeq("values")
          .filter(p => p.settings.isViewPlatform)
          .map(p => this.makePlatformConfigs(p.name, ["common", "view"]))
      ),
    ]);
  }

  getViewPlatforms(): Seq.Indexed<Platform> {
    return this._platformMap
      .toSeq("values")
      .filter(p => p.settings.isViewPlatform);
  }

  async makeServerConfigs() {
    await Promise.all(
      (await this._getProjectDependencies()).map(pd =>
        this.makeModule.makeTsconfigFile(
          path.join(this.projectModule.configsDir, "tsconfig.server.dev.json"),
          {
            extends: path.join(DABSI_DIR, "configs/tsconfig.server.base.json"),
            compilerOptions: {
              ...pd.paths.createPathsWithBaseUrl(pd.configsDir),
            },
            include: [
              ...pd.allProjectDependencyMap.toIndexedSeq().map(p => p.srcDir),
            ],
          }
        )
      )
    );
  }

  async loadViewPlatforms(platform: Platform) {
    const platforms = [this.commonPlatform, this.viewPlatform, platform];
    await Promise.all(platforms.map(p => p.load()));
    return platforms;
  }

  async getAndLoadPlatforms(platformNames: string[]): Promise<Platform[]> {
    return Promise.all(
      platformNames.toSeq().map(async name => {
        const platform = this.getPlatform(name);
        await platform.load();
        return platform;
      })
    );
  }

  protected async _getProjectDependencies(): Promise<
    Seq.Indexed<ProjectDependency>
  > {
    const pd = await this.projectModule.getProjectDependency();

    return DISABLE_DEEP_MAKE
      ? [pd].toSeq()
      : pd.allProjectDependencyMap.toIndexedSeq();
  }

  async makePlatformConfigs(platfromName: string, basePlatformNames: string[]) {
    const allPlatforms = await this.getAndLoadPlatforms([
      platfromName,
      ...basePlatformNames,
    ]);

    const [platform, ...basePlatforms] = allPlatforms;

    await Promise.all([
      // makes src/**/{platform}/tsconfig.json
      DISABLE_SRC_CONFIGS ||
        Promise.all(
          (await this._getProjectDependencies())
            .flatMap(projectDependency =>
              (platform.projectDirectoriesMap.get(projectDependency.dir) || [])
                .toSeq()
                .map(platformDir => ({ platformDir, projectDependency }))
            )
            .map(x =>
              this.makeModule.makeTsconfigFile(
                path.join(x.platformDir, "tsconfig.json"),
                {
                  extends: path.join(
                    x.projectDependency.configsDir,
                    `tsconfig.${platform.name}.dev.json`
                  ),
                }
              )
            )
        ),
      // makes configs/tsconfig.{platform}.dev.json
      DISABLE_DEV_CONFIGS ||
        Promise.all(
          (await this._getProjectDependencies()).map(pd =>
            Promise.all([
              this.makeModule.makeTsconfigFile(
                path.join(pd.configsDir, `tsconfig.${platform.name}.dev.json`),
                {
                  extends: path.join(
                    DABSI_DIR,
                    `configs/tsconfig.${platform.name}.base.json`
                  ),
                  compilerOptions: {
                    ...pd.paths.createPathsWithBaseUrl(pd.configsDir),
                  },
                  include: [
                    ...allPlatforms.toSeq().flatMap(platform =>
                      pd.allProjectDependencyMap
                        .toIndexedSeq()
                        .map(pd => path.join(pd.dir, "src/**/" + platform.name))
                        .toArray()
                        .concat(
                          platform.settings.isViewPlatform ||
                            platform.name === "view"
                            ? [...this.viewLibs]
                            : []
                        )
                    ),
                  ],
                }
              ),
            ])
          )
        ),
    ]);
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
                await (await this.projectModule.getPaths()).resolveTsPath(
                  fsPath,
                  outDir
                )
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
