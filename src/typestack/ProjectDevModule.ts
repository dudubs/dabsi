import { mapObjectToArray } from "@dabsi/common/object/mapObjectToArray";
import { Inject, Module } from "@dabsi/typedi";
import { DevModule } from "@dabsi/typestack/DevModule";
import ProjectManager from "@dabsi/typestack/ProjectManager";

@Module()
export class ProjectDevModule {
  constructor(
    @Inject() devModule: DevModule,
    @Inject() projectManager: ProjectManager
  ) {
    devModule.install({
      buildWatchdog: async w => {
        await projectManager.init();
        w.paths.push(
          ...mapObjectToArray(projectManager.projectMap, pi => pi.srcDir)
        );
      },
    });
  }
}
