import { values } from "@dabsi/common/object/values";
import { Once } from "@dabsi/common/patterns/Once";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Hookable } from "@dabsi/modules/Hookable";
import { Module } from "@dabsi/typedi";
import ProjectModule from "@dabsi/typestack/ProjectModule";
import ProjectModuleInfo from "@dabsi/typestack/ProjectModuleInfo";

@Module()
export default class PlatformModule {
  commonFiles!: Set<string>;

  projectModuleInfoBuilders: ((
    projectModuleInfo: ProjectModuleInfo
  ) => Awaitable)[] = [];

  constructor(protected projectModule: ProjectModule) {}

  @Once() async build() {
    this.commonFiles = new Set();

    for (const projectInfo of values(this.projectModule.projectMapInfo)) {
      for (const projectModuleInfo of values(projectInfo.moduleInfoMap)) {
        for (const builder of this.projectModuleInfoBuilders) {
          await builder(projectModuleInfo);
        }
      }
    }
  }
}
