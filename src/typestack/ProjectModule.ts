import { ProjectModuleInfo } from "./ProjectModuleInfo";
import { Cli } from "./../modules/Cli";
import { touchObject } from "@dabsi/common/object/touchObject";
import { DABSI_ROOT_DIR } from "@dabsi/index";
import { Inject, Module } from "@dabsi/typedi";
import { CallStackInfo } from "@dabsi/typedi/CallStackInfo";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import { MakeModule } from "@dabsi/typestack/MakeModule";
import { ProjectInfo } from "@dabsi/typestack/ProjectInfo";
import { existsSync } from "fs";
import path from "path";
import { Once } from "@dabsi/common/patterns/Once";
import { PlatformInfo } from "@dabsi/modules/PlatformInfo";

@Module()
export class ProjectModule {
  projectInfoMap: Record<string, ProjectInfo>;

  mainProjectInfo: ProjectInfo;

  providers: { error: Error; fileName: string }[] = [];

  constructor(
    @Inject() mMake: MakeModule,
    @Inject() protected runner: ModuleRunner,
    @Inject() cli: Cli
  ) {
    mMake.cli.install({ run: () => this.init() });
    cli.command(
      "testx",
      new Cli().install({
        run: async () => {
          console.log("hello");
          await this.init();
        },
      })
    );
  }

  @Once() async init() {
    this.projectInfoMap = {};

    for (const m of this.runner.getLoadedModules()) {
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
      const projectInfo = touchObject(
        this.projectInfoMap,
        projectDir,
        () => new ProjectInfo(projectDir)
      );

      projectInfo.moduleMapInfo[moduleDir] = new ProjectModuleInfo(
        projectInfo,
        moduleDir
      );

      if (this.runner.mainModuleTarget === m.target) {
        this.mainProjectInfo = projectInfo;
      }
    }
  }
}
