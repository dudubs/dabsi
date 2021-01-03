import { values } from "@dabsi/common/object/values";
import * as fs from "fs";
import path from "path";
import ProjectInfo from "@dabsi/typestack/ProjectInfo";

export default class ProjectPlatformInfo {
  bundleDir = path.join(this.projectInfo.bundleDir, this.name);

  generatedDir = path.join(this.projectInfo.generatedDir, this.name);

  generatedIndexFileName = path.join(this.generatedDir, "index.ts");

  tsConfigBaseName = `tsconfig.${this.name}.json`;

  tsConfigFileName = path.join(
    this.projectInfo.dir,
    "tsconfigs",
    `tsconfig.${this.name}.json`
  );

  constructor(public projectInfo: ProjectInfo, public name: string) {}
}
