import { mapObjectToArray } from "@dabsi/common/object/mapObjectToArray";
import { Inject, Module } from "@dabsi/typedi";
import { DevModule } from "@dabsi/typestack/DevModule";
import { ProjectModule } from "@dabsi/typestack/ProjectModule";

@Module()
export class ProjectDevModule {
  constructor(
    @Inject() devModule: DevModule,
    @Inject() projectModule: ProjectModule
  ) {
    devModule.install({
      buildWatchdog: async w => {
        await projectModule.init();
        w.paths.push(
          ...mapObjectToArray(projectModule.projectInfoMap, pi => pi.srcDir)
        );
      },
    });
  }
}
