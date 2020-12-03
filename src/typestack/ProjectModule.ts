import { existsSync } from "fs";
import path from "path";
import { touchObject } from "../common/object/touchObject";
import { DABSI_ROOT_DIR } from "../index";
import { CALL_STACK_PATTERN, CallStackInfo } from "../typedi/CallStackInfo";
import { Inject } from "../typedi";
import { Module } from "../typedi";
import { MakeModule } from "./MakeModule";
import { ProjectInfo } from "./ProjectInfo";

@Module()
export class ProjectModule {
  dirNames = new Set<string>();

  projectInfoMap: Record<string, ProjectInfo>;

  currentProjectInfo: ProjectInfo;

  providers: { error: Error; fileName: string }[] = [];

  constructor(@Inject() mMake: MakeModule) {
    mMake.cli.install({ run: () => this.init() });
  }

  async init() {
    if (this.projectInfoMap) return;

    for (const {
      error: { stack },
      fileName,
    } of this.providers) {
      const dirName = path.dirname(
        CallStackInfo.getLineInfo(stack!, fileName)!.fileName
      );
      if (!dirName.startsWith(DABSI_ROOT_DIR))
        throw new Error(`Invalid provider: ${stack}`);
      this.dirNames.add(dirName);
    }

    this.projectInfoMap = {};
    for (let dirName of this.dirNames) {
      if (!dirName.startsWith(DABSI_ROOT_DIR))
        throw new Error(`Project must to be in "${DABSI_ROOT_DIR}".`);

      const [projectDir] = dirName.split(/[\\\/]src([\\\/]|$)/);
      if (!existsSync(path.join(projectDir, "src")))
        throw new Error(`Invalid project directory ${dirName}`);

      const projectInfo = touchObject(
        this.projectInfoMap,
        projectDir,
        () => new ProjectInfo(projectDir)
      );
      projectInfo.dirNames.add(dirName);
      if (!this.currentProjectInfo) this.currentProjectInfo = projectInfo;
    }
  }
}
