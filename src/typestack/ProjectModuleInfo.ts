import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import Lazy from "@dabsi/common/patterns/lazy";
import { ModuleMetadata, ModuleTarget } from "@dabsi/typedi";
import ProjectInfo from "@dabsi/typestack/ProjectInfo";
import { readdirSync, Stats, statSync } from "fs";
import path from "path";

type ProjectFile = { baseName: string; fileName: string; stat: Stats };

export default class ProjectModuleInfo {
  constructor(
    public project: ProjectInfo,
    public dir: string,
    public target: ModuleTarget,
    public metadata: ModuleMetadata,
    public instance: object
  ) {}

  // TODO: Use globa files cache
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
