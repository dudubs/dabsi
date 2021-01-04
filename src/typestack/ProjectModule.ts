import { touchObject } from "@dabsi/common/object/touchObject";
import { Once } from "@dabsi/common/patterns/Once";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Hookable } from "@dabsi/modules/Hookable";
import LoaderModule from "@dabsi/modules/LoaderModule";
import {
  getDesignParamTypes,
  Inject,
  isModuleTarget,
  Module,
  moduleMetadataMap,
  ModuleTarget,
} from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import { getTsConfigPaths } from "@dabsi/typestack/getTsConfigPaths";
import ProjectInfo from "@dabsi/typestack/ProjectInfo";
import ProjectModuleInfo from "@dabsi/typestack/ProjectModuleInfo";
import { TsConfigPaths } from "@dabsi/typestack/TsConfigPaths";
import path from "path";
import { touchSet } from "../common/map/touchSet";

@Module()
export default class ProjectModule {
  projectMapInfo!: Record<string, ProjectInfo>;

  mainProject!: ProjectInfo;

  providers: { error: Error; fileName: string }[] = [];

  allProjectModules!: ProjectModuleInfo[];

  constructor(
    @Inject() protected runner: ModuleRunner,
    @Inject() protected loaderModule: LoaderModule
  ) {
    // makeModule.onMake(() => this.load());
    // cli.command(
    //   "check",
    //   new Cli().onRun(() => this.load())
    // );
  }

  onBuildCommonFiles = Hookable<
    (callback: (commonFileName: string) => Awaitable) => Awaitable
  >();

  onProjectModuleLoaded = Hookable<
    (projectModuleInfo: ProjectModuleInfo) => Awaitable
  >();

  _loadedProjectModules!: ProjectModuleInfo[];

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
      ) {
        log.warn(() => `No default export for "${moduleFileName}".`);
        continue;
      }
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

      await this._loadModule(projectModuleInfo);
    }
  }

  protected _loadedModules!: Set<ModuleTarget>;

  async _loadModule(moduleInfo: ProjectModuleInfo) {
    if (!touchSet(this._loadedModules, moduleInfo.target)) return;

    this.allProjectModules.push(moduleInfo);
    this._loadedProjectModules.push(moduleInfo);

    const pluginsDir = path.join(moduleInfo.dir, "plugins");
    if (!(await this.loaderModule.isDir(pluginsDir))) return;

    log.trace(() => `Load module plugins "${pluginsDir}".`);

    log.trace(
      () => `found plugins folder for module "${moduleInfo.target.name}".`
    );

    for (const baseName of await this.loaderModule.readDir(pluginsDir)) {
      const fileName = path.join(pluginsDir, baseName);
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

  async _loadModuleFile(fileName: string) {}

  protected async _loadPlugins() {
    while (this._loadedProjectModules.length) {
      const projectModuleInfos = this._loadedProjectModules;
      this._loadedProjectModules = [];

      for (const projectModuleInfo of projectModuleInfos) {
        await this._loadModule(projectModuleInfo);
      }
    }
  }

  mainTsConfigPaths!: TsConfigPaths;

  @Once() async loadTsConfigPaths() {
    this.mainTsConfigPaths = await getTsConfigPaths(
      path.join(this.mainProject.dir, "tsconfig.json"),
      path => this.loaderModule.readJsonFile(path),
      path => this.loaderModule.isFile(path),
      path => this.loaderModule.isDir(path)
    );
  }

  @Once() async load() {
    this.projectMapInfo = {};
    this.allProjectModules = [];
    this._loadedProjectModules = [];
    this._loadedModules = new Set();
    await this._loadRootModules();
    await this._loadPlugins();

    for (const projectModuleInfo of this.allProjectModules) {
      await this.onProjectModuleLoaded.invoke(projectModuleInfo);
    }
  }
}
