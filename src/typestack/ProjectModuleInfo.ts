import { ModuleMetadata, ModuleTarget } from "@dabsi/typedi";
import ProjectInfo from "@dabsi/typestack/ProjectInfo";

export default class ProjectModuleInfo {
  constructor(
    public project: ProjectInfo,
    public dir: string,
    public target: ModuleTarget,
    public metadata: ModuleMetadata,
    public instance: object
  ) {}
}
