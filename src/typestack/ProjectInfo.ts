import Cache from "@dabsi/common/patterns/Cache";
import Lazy from "@dabsi/common/patterns/lazy";
import { Once } from "@dabsi/common/patterns/Once";
import { DABSI_DIR } from "@dabsi/env";
import LoaderModule from "@dabsi/modules/LoaderModule";
import ProjectPlatformInfo from "@dabsi/modules/ProjectPlatformInfo";
import ProjectModuleInfo from "@dabsi/typestack/ProjectModuleInfo";
import { TsConfigPaths } from "@dabsi/typestack/TsConfigPaths";
import { TsConfigPathsSync } from "@dabsi/typestack/TsConfigPathsSync";
import path from "path";

export default class ProjectInfo {
  constructor(public dir: string, protected loaderModule: LoaderModule) {}

  bundleDir = path.join(this.dir, "bundle");

  srcDir = path.join(this.dir, "src");

  configsDir = path.join(this.dir, "configs");

  configFileName = path.join(this.dir, "tsconfig.json");

  generatedDir = path.join(this.dir, "generated");

  moduleMap: Record<string, ProjectModuleInfo> = {};

  isRoot = this.dir === DABSI_DIR;

  @Cache() getPlatformInfo(name: string): ProjectPlatformInfo {
    return new ProjectPlatformInfo(this, name);
  }

  @Lazy() get configPaths() {
    return TsConfigPathsSync.fromFile(
      this.configFileName,
      path => this.loaderModule.readJsonFile(path),
      path => this.loaderModule.isFile(path),
      path => this.loaderModule.isDir(path)
    );
  }
}
