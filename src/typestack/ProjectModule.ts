import { touchObject } from "@dabsi/common/object/touchObject";
import { Once } from "@dabsi/common/patterns/Once";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Cli } from "@dabsi/modules/Cli";
import { Hookable } from "@dabsi/modules/Hookable";
import LoaderModule from "@dabsi/modules/LoaderModule";
import {
  getDesignParamTypes,
  Inject,
  isModuleTarget,
  Module,
  moduleMetadataMap,
} from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import { getTsConfigPaths } from "@dabsi/typestack/getTsConfigPaths";
import { MakeModule } from "@dabsi/typestack/MakeModule";
import ProjectInfo from "@dabsi/typestack/ProjectInfo";
import ProjectModuleInfo from "@dabsi/typestack/ProjectModuleInfo";
import createTsConfigPaths, {
  TsConfigPaths,
} from "@dabsi/typestack/TsConfigPaths";
import fs from "fs";
import path from "path";

@Module()
export default class ProjectModule {
  projectMapInfo: Record<string, ProjectInfo>;

  mainProject: ProjectInfo;

  providers: { error: Error; fileName: string }[] = [];

  allProjectModuleInfos: ProjectModuleInfo[];

  constructor(
    @Inject() makeModule: MakeModule,
    @Inject() protected runner: ModuleRunner,
    @Inject() cli: Cli,
    @Inject() protected loaderModule: LoaderModule
  ) {
    makeModule.onMake(() => this.load());
    cli.command(
      "check",
      new Cli().onRun(() => this.load())
    );
  }

  onBuildCommonFiles = Hookable<
    (callback: (commonFileName: string) => Awaitable) => Awaitable
  >();

  onLoadPorjectModuleEntity = Hookable<
    (projectModuleInfo: ProjectModuleInfo) => Awaitable
  >();

  _loadedProjectModuleInfos: ProjectModuleInfo[];

  protected async _loadRootModules() {
    for (const m of this.runner.getAllInstances()) {
      const moduleFileName = m.metadata.callStackInfo.lineInfo.fileName;

      if (!(/*is index file*/ /[\\\/]index\.ts/.test(moduleFileName))) continue;

      if (
        !(
          /*module default is module target*/ (
            require(moduleFileName)?.["default"] === m.target
          )
        )
      )
        continue;
      log.trace(() => `Load root module "${m.target.name}".`);
      const moduleDir = path.dirname(moduleFileName);
      const projectDir = moduleFileName.replace(/[\\\/]src[\\\/].*$/, "");

      const projectInfo = touchObject(
        this.projectMapInfo,
        projectDir,
        () => new ProjectInfo(projectDir, this.loaderModule)
      );

      if (this.runner.mainModuleTarget === m.target) {
        this.mainProject = projectInfo;
      }

      const projectModuleInfo = (projectInfo.moduleInfoMap[
        moduleDir
      ] = new ProjectModuleInfo(
        projectInfo,
        moduleDir,
        m.target,
        m.metadata,
        m.target
      ));

      await this._loadProjectModuleInfo(projectModuleInfo);
    }
  }

  async _loadProjectModuleInfo(projectModuleInfo: ProjectModuleInfo) {
    this.allProjectModuleInfos.push(projectModuleInfo);
    this._loadedProjectModuleInfos.push(projectModuleInfo);

    const {
      fileMap: { plugins: pluginsFile },
    } = projectModuleInfo;
    if (pluginsFile?.stat.isDirectory()) {
      log.trace(
        () =>
          `found plugins folder for module "${projectModuleInfo.target.name}".`
      );

      for (const baseName of await fs.promises.readdir(pluginsFile.fileName)) {
        const fileName = path.join(pluginsFile.fileName, baseName);
        log.trace(() => `Load ${fileName}`);
        const moduleTarget = require(fileName)?.default;
        if (!isModuleTarget(moduleTarget)) {
          log.trace(() => `is not module target.`);
          continue;
        }
        if (this.runner.moduleInstanceMap.has(moduleTarget)) continue;

        const moduleMetadata = moduleMetadataMap.get(moduleTarget);
        const requiredModule =
          getDesignParamTypes(moduleTarget).find(
            paramType =>
              isModuleTarget(paramType) &&
              !this.runner.moduleInstanceMap.has(paramType)
          ) ||
          moduleMetadata?.dependencies?.find(
            moduleTarget => !this.runner.moduleInstanceMap.has(moduleTarget)
          );

        if (requiredModule) {
          log.trace(() => `require module ${requiredModule.name}".`);
          continue;
        }

        this.runner.getInstance(moduleTarget);
      }
    }
  }

  async _loadModuleFile(fileName: string) {}

  protected async _loadPlugins() {
    while (this._loadedProjectModuleInfos.length) {
      const projectModuleInfos = this._loadedProjectModuleInfos;
      this._loadedProjectModuleInfos = [];

      for (const projectModuleInfo of projectModuleInfos) {
        await this._loadProjectModuleInfo(projectModuleInfo);
      }
    }
  }

  mainTsConfigPaths: TsConfigPaths;

  @Once() async load() {
    this.projectMapInfo = {};
    this.allProjectModuleInfos = [];
    this._loadedProjectModuleInfos = [];
    await this._loadRootModules();

    //
    this.mainTsConfigPaths = await getTsConfigPaths(
      path.join(this.mainProject.dir, "tsconfig.json"),
      path => this.loaderModule.readJsonFile(path),
      path => this.loaderModule.isFile(path)
    );
    this.mainProject.dir;

    //
    for (const projectModuleInfo of this.allProjectModuleInfos) {
      await this.onLoadPorjectModuleEntity.invoke(projectModuleInfo);
    }
  }
}
