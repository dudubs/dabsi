import path from "path";
import { DABSI_ROOT_DIR } from "@dabsi/index";
import { TsConfigInfo } from "@dabsi/typestack/TsConfigInfo";
import { ProjectModuleInfo } from "./ProjectModuleInfo";

export class ProjectInfo {
  constructor(public dir: string) {}

  dirNames = new Set<string>();

  bundleDir = path.join(this.dir, "bundle");

  srcDir = path.join(this.dir, "src");

  generatedDir = path.join(this.dir, "generated");

  tsConfigInfo = new TsConfigInfo(path.join(this.dir, "tsconfig.json"));

  moduleMapInfo: Record<string, ProjectModuleInfo> = {};
}
