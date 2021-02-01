import Lazy from "@dabsi/common/patterns/lazy";
import { Once } from "@dabsi/common/patterns/Once";
import { DABSI_PATH } from "@dabsi/index";
import LoaderModule from "@dabsi/modules/LoaderModule";
import { relativePosixPath } from "@dabsi/modules/pathHelpers";
import ProjectPlatformInfo from "@dabsi/modules/ProjectPlatformInfo";
import { Injectable } from "@dabsi/typedi";
import { MakeModule } from "@dabsi/typestack/MakeModule";
import ProjectModule from "@dabsi/typestack/ProjectModule";
import path from "path";

@Injectable()
export class PlatformModuleContext {
  constructor(
    public projectModule: ProjectModule,
    public loaderModule: LoaderModule,
    public makeModule: MakeModule
  ) {}
}

export class PlatformModule {
  indexFiles = new Set<string>();
  testsFiles = new Set<string>();

  constructor(
    public context: PlatformModuleContext,
    public name: string,
    protected parents: PlatformModule[] = []
  ) {
    context.loaderModule.onLoadDir(async dir => {
      // TODO: Only for making

      const loadIndexFile = async (dir: string, files: Set<string>) => {
        const indexFileName = await context.loaderModule.getIndexFile(dir);
        if (!indexFileName) return;

        files.add(indexFileName);
      };

      await loadIndexFile(path.join(dir, name), this.indexFiles);
      await loadIndexFile(path.join(dir, name, "tests"), this.testsFiles);
    });
    context.makeModule.onMake(async () => {
      await this.mainProjectPlatform.project.loadConfigPaths();
      await this._makeRootConfigFile();
      await this._makeConfigFiles();
      await this._makeCommonFiles();
    });
  }

  @Lazy() get mainProjectPlatform(): ProjectPlatformInfo {
    return this.context.projectModule.mainProject.getPlatformInfo(this.name);
  }
  @Lazy() get rootProjectPlatform(): ProjectPlatformInfo {
    return this.context.projectModule.projectMap[DABSI_PATH].getPlatformInfo(
      this.name
    );
  }

  protected async _makeRootConfigFile() {
    const {
      mainProjectPlatform: {
        configFileName,
        project: { configsDir },
      },
    } = this;

    const make = (configFileName, prod: boolean) =>
      this.context.makeModule.makeJsonFile(configFileName, {
        extends: path.join(
          this.rootProjectPlatform.project.configsDir,
          `tsconfig.base.${this.name}.json`
        ),
        compilerOptions: {
          ...this.mainProjectPlatform.project.configPaths.getConfigForDir(
            configsDir
          ),
        },
        include: (prod
          ? [this.mainProjectPlatform.project]
          : this.context.projectModule.projects
        )
          .toSeq()
          .flatMap(project =>
            (prod
              ? [this].toSeq()
              : this.parents.toSeq().concat([this])
            ).map(platform =>
              relativePosixPath(
                configsDir,
                path.join(project.srcDir, "**", platform.name)
              )
            )
          )
          .toArray(),
      });

    await make(configFileName, false);
    await make(
      path.join(
        this.mainProjectPlatform.project.configsDir,
        `tsconfig.${this.name}.prod.json`
      ),
      true
    );
  }
  protected async _makeConfigFiles() {
    const {
      mainProjectPlatform: { configFileName: mainConfigFileName },
    } = this;

    this.context.makeModule.makeJsonFile(mainConfigFileName, {
      extends: relativePosixPath(
        this.mainProjectPlatform.project.configsDir,
        path.join(
          this.rootProjectPlatform.project.configsDir,
          `tsconfig.base.${this.name}.json`
        )
      ),
    });

    for (const indexFileName of this.indexFiles) {
      const indexDir = path.dirname(indexFileName);
      const indexConfigFileName = path.join(indexDir, "tsconfig.json");
      await this.context.makeModule.makeJsonFile(indexConfigFileName, {
        extends: relativePosixPath(
          indexDir,
          this.mainProjectPlatform.configFileName
        ),
      });
    }
  }

  protected async _makeCommonFile(
    outFileName: string,
    importFileNames: Iterable<string>,
    generateImportCode: (fileName: string) => string
  ) {
    const outDir = path.dirname(outFileName);
    let code = "";
    for (const importFileName of importFileNames) {
      const importName = await this.mainProjectPlatform.project.configPaths.getTsPath(
        importFileName,
        outDir
      );
      code += generateImportCode(importName!) + "\n";
    }
    await this.context.makeModule.makeFile(outFileName, code);
  }

  protected async _makeCommonFiles() {
    await this._makeCommonFile(
      this.mainProjectPlatform.generatedIndexFileName,
      this.indexFiles,
      importName => `import "${importName}";`
    );
    await this._makeCommonFile(
      this.mainProjectPlatform.generatedTestsFileName,
      this.testsFiles,
      importName =>
        `describe("${importName}", ()=>{ require("${importName}") });`
    );
  }
}
