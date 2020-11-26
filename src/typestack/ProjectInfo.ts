import path from "path";
import { DABSI_ROOT_DIR } from "../index";
import { TsConfigInfo } from "./TsConfigInfo";

export class ProjectInfo {
  constructor(public rootDir: string) {}

  dirNames = new Set<string>();

  bundleDir = path.join(this.rootDir, "bundle");

  srcDir = path.join(this.rootDir, "src");

  generatedDir = path.join(this.rootDir, "generated");

  tsConfigInfo = new TsConfigInfo(path.join(this.rootDir, "tsconfig.json"));
}
