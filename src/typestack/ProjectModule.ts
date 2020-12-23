import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import { Lazy } from "@dabsi/common/patterns/lazy";
import { readdirSync, Stats, statSync } from "fs";
import path from "path";
import Project from "@dabsi/typestack/Project";

type ProjectFile = { baseName: string; fileName: string; stat: Stats };
export default class ProjectModule {
  constructor(public project: Project, public dir: string) {}

  @Lazy() get fileMap(): Record<string, ProjectFile | undefined> {
    return mapArrayToObject(this.files, file => [file.baseName, file]);
  }

  @Lazy() get files(): ProjectFile[] {
    return readdirSync(this.dir).map(baseName => {
      const fileName = path.join(this.dir, baseName);
      return { baseName, fileName, stat: statSync(fileName) };
    });
  }
}
