import ProjectModuleEntity from "@dabsi/typestack/ProjectModuleEntity";
import { TsConfigInfo } from "@dabsi/typestack/TsConfigInfo";
import path from "path";

export default class ProjectEntity {
  constructor(public dir: string) {}

  dirNames = new Set<string>();

  bundleDir = path.join(this.dir, "bundle");

  srcDir = path.join(this.dir, "src");

  generatedDir = path.join(this.dir, "generated");

  tsConfigInfo = new TsConfigInfo(path.join(this.dir, "tsconfig.json"));

  moduleDirMap: Record<string, ProjectModuleEntity> = {};
}
