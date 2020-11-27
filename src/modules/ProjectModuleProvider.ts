import { ModuleProvider } from "../typedi";
import { ProjectModule } from "../typestack/ProjectModule";

export function ProjectModuleProvider(): ModuleProvider {
  const error = new Error();
  return ModuleProvider([ProjectModule], (projectModule) => {
    projectModule.providers.push({ error, fileName: __filename });
    return {};
  });
}
