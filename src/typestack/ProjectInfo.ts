import { DABSI_PATH } from "@dabsi/index";
import LoaderModule from "@dabsi/modules/LoaderModule";
import ProjectModuleInfo from "@dabsi/typestack/ProjectModuleInfo";
import path from "path";

export default class ProjectInfo {
  constructor(public dir: string, protected loaderModule: LoaderModule) {}

  bundleDir = path.join(this.dir, "bundle");

  srcDir = path.join(this.dir, "src");

  tsConfigsDir = path.join(this.dir, "tsconfigs");

  generatedDir = path.join(this.dir, "generated");

  moduleInfoMap: Record<string, ProjectModuleInfo> = {};

  isRoot = this.dir === DABSI_PATH;
}
