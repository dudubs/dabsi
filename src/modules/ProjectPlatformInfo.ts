import ProjectInfo from "@dabsi/typestack/ProjectInfo";
import path from "path";

export default class ProjectPlatformInfo {
  bundleDir = path.join(this.project.bundleDir, this.name);

  generatedDir = path.join(this.project.generatedDir, this.name);

  generatedIndexFileName = path.join(this.generatedDir, "index.ts");

  generatedTestsFileName = path.join(this.generatedDir, "tests.ts");

  configFileName = path.join(
    this.project.configsDir,
    `tsconfig.${this.name}.json`
  );

  constructor(public project: ProjectInfo, public name: string) {}
}
