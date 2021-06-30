// TODO: fix make when no have platofrm folders under src/ - expect to make tsconfigs
import Touch from "@dabsi/common/patterns/Touch";
import { DABSI_DIR } from "@dabsi/env";
import MakeModule from "@dabsi/modules/MakeModule";
import { ProjectDependency } from "@dabsi/modules/ProjectDependency";
import ProjectModule from "@dabsi/modules/ProjectModule";
import { CliCommand } from "@dabsi/typecli";
import { Module } from "@dabsi/typemodule";
import { ModuleRunner } from "@dabsi/typemodule/ModuleRunner";
import { Seq } from "immutable4";
import { entries } from "lodash";
import path from "path";
import Platform from "./Platform";
import PlatformContext from "./PlatformContext";

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
    protected projectModule: ProjectModule,
    protected moduleRunner: ModuleRunner,
    protected makeModule: MakeModule,
    protected platformContext: PlatformContext
  ) {}

  readonly log = log.get("PLATFORM");

  readonly viewLibs = new Set<string>();

  readonly serverLibs = new Set<string>();

  readonly commonPlatform = this.getPlatform("common");

  readonly viewPlatform = this.getPlatform("view");

  @Touch() getPlatform(name: string) {
    return new Platform(this.platformContext, name);
  }

  @CliCommand("make")
  async make() {
    await Promise.all([
      this.makeServerConfigs(),
      this.makePlatformConfigs("common", []),
      this.makePlatformConfigs("view", ["common"]),
      Promise.all(
        Touch.getMap(this, "getPlatform")!
          .toSeq("values")
          .filter(p => p.options.isViewPlatform)
          .map(p => this.makePlatformConfigs(p.name, ["common", "view"]))
      ),
    ]);
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
                          platform.options.isViewPlatform ||
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

  async makeTestsFile(outFileName: string, testsFiles: string[], code = "") {
    return this.makeSourceFile(
      outFileName,
      testsFiles,
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
        platforms.flatMap(p => p.testsFiles),
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
