import ProjectInfo from "@dabsi/typestack/ProjectInfo";
import path from "path";

export default class ProjectPlatformInfo {
  constructor(public project: ProjectInfo, public name: string) {}
}
