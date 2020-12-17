import { values } from "@dabsi/common/object/values";
import * as fs from "fs";
import path from "path";
import { ProjectInfo } from "@dabsi/typestack/ProjectInfo";

export class PlatformInfo {
  bundleDir = path.join(this.projectInfo.bundleDir, this.name);

  generatedDir = path.join(this.projectInfo.generatedDir, this.name);

  generatedIndexFileName = path.join(this.generatedDir, "index.ts");

  tsConfigBaseName = `tsconfig.${this.name}.json`;

  tsConfigFileName = path.join(this.projectInfo.dir, this.tsConfigBaseName);

  constructor(public projectInfo: ProjectInfo, public name: string) {}

  *findIndexDirNames() {
    const srcDir = path.join(this.projectInfo.srcDir, this.name);
    if (fs.existsSync(path.join(srcDir, "index.ts"))) {
      yield srcDir;
    }

    for (const moduleInfoMap of values(this.projectInfo.moduleMapInfo)) {
      const indexDir = path.join(moduleInfoMap.dir, this.name);
      const indexFileName = path.join(indexDir, "index.ts");
      if (fs.existsSync(indexFileName)) {
        yield indexDir;
      }
    }
  }
}
