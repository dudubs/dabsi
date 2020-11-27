import { mapObjectToArray } from "../common/object/mapObjectToArray";
import { Inject, Module } from "../typedi";
import { DevModule } from "./DevModule";
import { ProjectModule } from "./ProjectModule";

@Module()
export class ProjectDevModule {
  constructor(
    @Inject() devModule: DevModule,
    @Inject() projectModule: ProjectModule
  ) {
    devModule.push({
      buildWatchdog: async w => {
        await projectModule.init();
        w.paths.push(
          ...mapObjectToArray(projectModule.projectInfoMap, pi => pi.srcDir)
        );
      },
    });
  }
}
