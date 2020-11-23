import fs, { existsSync, realpathSync } from "fs";
import path, { dirname, join, resolve } from "path";
import { fileExistsSync } from "tsconfig-paths/lib/filesystem";
import { Lazy } from "../common/patterns/lazy";
import { Inject } from "../typedi/Inject";
import { Module, ModuleProvider } from "../typedi/Module";
import { DevModule } from "../typestack/DevModule";
import { ProjectModule } from "../typestack/ProjectModule";
import { Builder } from "./Builder";

export function PlatformProvider(path: string) {
  return ModuleProvider(
    [PlatformBuilder, DevModule],
    (platformBuilder, dev) => {
      platformBuilder.include(path);

      return {};
    }
  );
}

export class Platform {
  indexPaths = Array<string>();

  paths = new Set<string>();

  generatedPath = resolve(this.rootPath, "generated", this.name);

  generatedIndexPath = resolve(this.generatedPath, "index.ts");

  platformPaths: string[] = [];

  bundlePath = resolve(this.rootPath, "bundle", this.name);

  srcPath = resolve(this.rootPath, "src", this.name);

  modulesPath: string[] = [];

  constructor(public rootPath: string, public name: string) {}
}

@Module()
export class PlatformBuilder extends Builder<Platform> {
  constructor(@Inject() protected projectModule: ProjectModule) {
    super();
  }

  create(name: string): Platform {
    const info = new Platform(this.projectModule.path, name);
    this.build(info);
    return info;
  }

  include(path: string) {
    this.push(p => {
      if (p.paths.has(path)) return;
      if (fileExistsSync(path)) path = dirname(path);
      p.paths.add(path);
      const platformPath = resolve(path, p.name);
      if (!existsSync(platformPath)) return;

      p.platformPaths.push(platformPath);
      const indexPath = resolve(platformPath, "index.ts");
      if (fileExistsSync(indexPath)) p.indexPaths.push(indexPath);

      if (platformPath !== p.srcPath)
        p.modulesPath.push(join(platformPath, "tsconfig.path"));
    });
  }

  // PlatformInfo PlatformNameInfo
}
