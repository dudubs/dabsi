import { ModuleProvider } from "../typedi";
import { ProjectModule } from "../typestack/ProjectModule";

export function ProjectModuleProvider() {
  const error = new Error();
  return ModuleProvider([ProjectModule], (projectModule) => {
    projectModule.providers.push({ error, fileName: __filename });
    return {};
  });
}
