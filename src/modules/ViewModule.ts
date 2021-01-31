import { values } from "@dabsi/common/object/values";
import { Once } from "@dabsi/common/patterns/Once";
import LoaderModule from "@dabsi/modules/LoaderModule";
import { Module } from "@dabsi/typedi";
import ProjectModule from "@dabsi/typestack/ProjectModule";
import path from "path";

@Module()
export default class ViewModule {
  constructor(
    protected projectModule: ProjectModule,
    protected loaderModule: LoaderModule
  ) {
    projectModule.onBuildCommonFiles(async addCommonFile => {
      for (const projectInfo of values(projectModule.projectMapInfo)) {
        for (const projectModuleInfo of values(projectInfo.moduleInfoMap)) {
          projectModuleInfo.dir;
          const viewIndexFile = await loaderModule.getIndexFile(
            path.join(projectModuleInfo.dir, "view")
          );
          viewIndexFile && (await addCommonFile(viewIndexFile));
        }
      }
    });
  }
  @Once() async init() {}
}
