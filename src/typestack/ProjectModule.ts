import fs from "fs";
import { touchObject } from "@dabsi/common/object/touchObject";
import { Once } from "@dabsi/common/patterns/Once";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Cli } from "@dabsi/modules/Cli";
import { Hookable } from "@dabsi/modules/Hookable";
import {
  getDesignParamTypes,
  Inject,
  isModuleTarget,
  Module,
  moduleMetadataMap,
} from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import { MakeModule } from "@dabsi/typestack/MakeModule";
import ProjectEntity from "@dabsi/typestack/ProjectEntity";
import ProjectModuleEntity from "@dabsi/typestack/ProjectModuleEntity";
import path from "path";
import { chain } from "@dabsi/common/object/chain";

@Module()
export default class ProjectModule {
  projectMap: Record<string, ProjectEntity>;

  mainProject: ProjectEntity;

  providers: { error: Error; fileName: string }[] = [];

  allProjectModuleEntitys: ProjectModuleEntity[];

  constructor(
    @Inject() makeModule: MakeModule,
    @Inject() protected runner: ModuleRunner,
    @Inject() cli: Cli
  ) {
    makeModule.cli.onRun(() => this.load());
    cli.command(
      "check",
      new Cli().onRun(() => this.load())
    );
  }

  onFindCommonModules = Hookable<
    (callback: (indexFileName: string) => Awaitable) => Awaitable
  >();
  onLoadPorjectModuleEntity = Hookable<
    (projectModule: ProjectModuleEntity) => Awaitable
  >();

  _loadedProjectModuleEntitys: ProjectModuleEntity[];

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
      const project = touchObject(
        this.projectMap,
        projectDir,
        () => new ProjectEntity(projectDir)
      );

      if (this.runner.mainModuleTarget === m.target) {
        this.mainProject = project;
      }

      const projectModule = (project.moduleDirMap[
        moduleDir
      ] = new ProjectModuleEntity(
        project,
        moduleDir,
        m.target,
        m.metadata,
        m.target
      ));

      await this._loadProjectModuleEntity(projectModule);
    }
  }

  async _loadProjectModuleEntity(projectModule: ProjectModuleEntity) {
    this.allProjectModuleEntitys.push(projectModule);
    this._loadedProjectModuleEntitys.push(projectModule);

    const {
      fileMap: { plugins: pluginsFile },
    } = projectModule;
    if (pluginsFile?.stat.isDirectory()) {
      log.trace(
        () => `found plugins folder for module "${projectModule.target.name}".`
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
    while (this._loadedProjectModuleEntitys.length) {
      const projectModules = this._loadedProjectModuleEntitys;
      this._loadedProjectModuleEntitys = [];

      for (const projectModule of projectModules) {
        await this._loadProjectModuleEntity(projectModule);
      }
    }
  }

  @Once() async load() {
    this.projectMap = {};
    this.allProjectModuleEntitys = [];
    this._loadedProjectModuleEntitys = [];
    await this._loadRootModules();

    //
    for (const projectModule of this.allProjectModuleEntitys) {
      await this.onLoadPorjectModuleEntity.invoke(projectModule);
    }
  }
}
