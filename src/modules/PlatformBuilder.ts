import fs, { existsSync, realpathSync, statSync } from "fs";
import path, { dirname, resolve } from "path";
import { fileExistsSync } from "tsconfig-paths/lib/filesystem";
import { Module, ModuleProvider } from "../typedi/Module";
import { DevModule } from "../typestack/DevModule";
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

export const CURRENT_PATH = realpathSync(".");

export class Platform {
  indexPaths = Array<string>();
  paths = new Set<string>();

  generatedPath = resolve(CURRENT_PATH, "generated", this.name);
  generatedIndexPath = resolve(this.generatedPath, "index.ts");
  platformPaths: string[] = [];
  bundlePath = resolve(CURRENT_PATH, "bundle", this.name);
  constructor(public name: string) {}

  createIndexSource() {
    let code = "// @generated\n\n";
    for (let indexFileName of this.indexPaths) {
      code += `import "${path
        .relative(this.generatedPath, indexFileName)
        .replace(/\\/g, "/")}";\n`;
    }
  }

  async makeIndexFile() {
    console.log(`make "${this.generatedIndexPath}".`);
    await fs.promises.mkdir(this.generatedPath, { recursive: true });
    await fs.writeFileSync(this.generatedIndexPath, this.createIndexSource());
  }
}

@Module()
export class PlatformBuilder extends Builder<Platform> {
  create(name: string): Platform {
    const info = new Platform(name);
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
    });
  }

  // PlatformInfo PlatformNameInfo
}
