import { touchObject } from "@dabsi/common/object/touchObject";
import { Once } from "@dabsi/common/patterns/Once";
import { Inject, Module } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import { MakeModule } from "@dabsi/typestack/MakeModule";
import Project from "@dabsi/typestack/Project";
import path from "path";
import { Cli } from "@dabsi/modules/Cli";
import ProjectModule from "@dabsi/typestack/ProjectModule";

@Module()
export default class ProjectManager {
  projectMap: Record<string, Project>;

  mainProject: Project;

  providers: { error: Error; fileName: string }[] = [];

  allProjectModules: ProjectModule[];

  constructor(
    @Inject() makeModule: MakeModule,
    @Inject() protected runner: ModuleRunner,
    @Inject() cli: Cli
  ) {
    makeModule.cli.install({ run: () => this.load() });
  }

  @Once() async load() {
    this.projectMap = {};
    this.allProjectModules = [];

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

      const moduleDir = path.dirname(moduleFileName);
      const projectDir = moduleFileName.replace(/[\\\/]src[\\\/].*$/, "");
      const project = touchObject(
        this.projectMap,
        projectDir,
        () => new Project(projectDir)
      );

      const projectModule = (project.moduleMap[moduleDir] = new ProjectModule(
        project,
        moduleDir
      ));

      this.allProjectModules.push(projectModule);

      if (this.runner.mainModuleTarget === m.target) {
        this.mainProject = project;
      }
    }
  }
}
