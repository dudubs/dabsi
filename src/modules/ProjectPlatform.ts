import { values } from "@dabsi/common/object/values";
import * as fs from "fs";
import path from "path";
import Project from "@dabsi/typestack/Project";

export default class ProjectPlatform {
  bundleDir = path.join(this.project.bundleDir, this.name);

  generatedDir = path.join(this.project.generatedDir, this.name);

  generatedIndexFileName = path.join(this.generatedDir, "index.ts");

  tsConfigBaseName = `tsconfig.${this.name}.json`;

  tsConfigFileName = path.join(this.project.dir, this.tsConfigBaseName);

  constructor(public project: Project, public name: string) {}
}
