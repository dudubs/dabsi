import { Once } from "@dabsi/common/patterns/Once";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { DABSI_DIR } from "@dabsi/env";
import { Hookable } from "@dabsi/modules/Hookable";
import LoaderModule from "@dabsi/modules/LoaderModule";
import {
  getDesignParamTypes,
  isModuleTarget,
  Module,
  moduleMetadataMap,
  ModuleTarget,
} from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import ProjectInfo from "@dabsi/typestack/ProjectInfo";
import ProjectModuleInfo from "@dabsi/typestack/ProjectModuleInfo";
import path from "path";
import { touchSet } from "../common/set/touchSet";

@Module({
  dependencies: [],
})
export default class ProjectModule {
  projectMap!: Record<string, ProjectInfo>;

  mainProject!: ProjectInfo;

  get rootPorject(): ProjectInfo {
    return this.projectMap[DABSI_DIR];
  }

  projects: ProjectInfo[] = [];

  modules: ProjectModuleInfo[] = [];

  onLoadModule = Hookable<
    (projectModuleInfo: ProjectModuleInfo) => Awaitable
  >();

  protected _loadedModules!: Set<ModuleTarget>;

  constructor(
    protected runner: ModuleRunner,
    protected loaderModule: LoaderModule
  ) {
    loaderModule.loaders.push(() => this._load());
  }

  protected _newLoadedModules!: ProjectModuleInfo[];

  protected async _loadProject(path: string): Promise<ProjectInfo> {
    const projectDir = path.replace(/[\\\/]src[\\\/].*$/, "");
    let project = this.projectMap[projectDir];
    if (!project) {
      project = new ProjectInfo(projectDir, this.loaderModule);
      this.projects.push(project);
      this.projectMap[projectDir] = project;
      await this.loaderModule.loadDir(project.srcDir);
    }
    return project;
  }

  protected async _loadModules() {
    for (const m of this.runner.getInstances()) {
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

      const project = await this._loadProject(moduleFileName);

      if (this.runner.mainTarget === m.target) {
        this.mainProject = project;
      }
      const moduleDir = path.dirname(moduleFileName);
      const module = (project.moduleMap[moduleDir] = new ProjectModuleInfo(
        project,
        moduleDir,
        m.target,
        m.metadata,
        m.target
      ));
      this.modules.push(module);
      await this.loaderModule.loadDir(moduleDir);
      await this._loadModulePlugins(module);
    }
  }

  protected async _loadModulePlugins(moduleInfo: ProjectModuleInfo) {
    if (!touchSet(this._loadedModules, moduleInfo.target)) return;

    this._newLoadedModules.push(moduleInfo);

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
      if (this.runner.instanceMap.has(moduleTarget)) continue;

      const moduleMetadata = moduleMetadataMap.get(moduleTarget);

      const requiredModule =
        getDesignParamTypes(moduleTarget).find(
          paramType =>
            isModuleTarget(paramType) && !this.runner.instanceMap.has(paramType)
        ) ||
        moduleMetadata?.dependencies?.find(
          moduleTarget => !this.runner.instanceMap.has(moduleTarget)
        );

      if (requiredModule) {
        log.trace(() => `require module ${requiredModule.name}".`);
        continue;
      }

      this.runner.getInstance(moduleTarget);
    }
  }

  protected async _loadPlugins() {
    while (this._newLoadedModules.length) {
      const newLoadedModules = this._newLoadedModules;
      this._newLoadedModules = [];

      for (const projectModuleInfo of newLoadedModules) {
        await this._loadModulePlugins(projectModuleInfo);
      }
    }
  }

  @Once() protected async _load() {
    this.projectMap = {};
    this._newLoadedModules = [];
    this._loadedModules = new Set();
    await this._loadModules();
    await this._loadPlugins();

    for (const module of this.modules) {
      await this.onLoadModule.invoke(module);
    }
  }
}

export function getProjectDir(path: string) {
  return path.replace(/[\\\/]src[\\\/].*$/, "");
}
