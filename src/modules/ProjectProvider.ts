import { ModuleProvider } from "../typedi/Module";
import { ProjectModule } from "../typestack/ProjectModule";

export function ProjectProvider() {
  const error = new Error();
  return ModuleProvider([ProjectModule], projectModule => {
    projectModule.providers.push({ error, fileName: __filename });
    return {};
  });
}
