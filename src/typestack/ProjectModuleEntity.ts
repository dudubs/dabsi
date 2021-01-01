import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import { Lazy } from "@dabsi/common/patterns/lazy";
import { readdirSync, Stats, statSync } from "fs";
import path from "path";
import ProjectEntity from "@dabsi/typestack/ProjectEntity";
import { Once } from "@dabsi/common/patterns/Once";
import { ModuleMetadata, ModuleTarget } from "@dabsi/typedi";

type ProjectFile = { baseName: string; fileName: string; stat: Stats };

export default class ProjectModuleEntity {
  constructor(
    public project: ProjectEntity,
    public dir: string,
    public target: ModuleTarget,
    public metadata: ModuleMetadata,
    public instance: object
  ) {}

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
