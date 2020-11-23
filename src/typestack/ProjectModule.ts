import { readFileSync, realpathSync } from "fs";
import { basename, join } from "path";
import { mapArrayToObject } from "../common/array/mapArrayToObject";
import { Lazy } from "../common/patterns/lazy";
import { relativePosixPath } from "../modules/pathHelpers";
import { TsConfig } from "../modules/TsConfig";
import { Resolver } from "../typedi";
import { DefaultResolver } from "../typedi/DefaultResolver";
import { Inject } from "../typedi/Inject";
import { Module } from "../typedi/Module";

const CURRENT_PATH = realpathSync(".");

export const ProjectPathResolver = Resolver<string>();

@Module()
export class ProjectModule {
  constructor(
    @Inject(DefaultResolver(ProjectPathResolver, CURRENT_PATH))
    public path: string
  ) {}

  @Lazy() get paths() {
    return this.pathsInfo.map(p => p.path);
  }

  @Lazy() get pathsInfo() {
    return Object.keys(require.cache)
      .toSeq()
      .filter(path => !/[\\\/]node_modules[\\\/]/.test(path))
      .map(path => path.replace(/[\\\/]src[\\\/].*$/, ""))
      .toSet()
      .map(path => ({
        path,
        isBasePath: path !== CURRENT_PATH,
        baseName: basename(path),
        srcPath: join(path, "src"),
      }))
      .toArray();
  }

  @Lazy() get basePaths() {
    return this.paths.filter(p => p !== CURRENT_PATH);
  }

  getTsConfigPaths(outDir: string) {
    return mapArrayToObject(this.pathsInfo, pi => {
      if (pi.isBasePath)
        return [
          `@${pi.baseName}/*`,
          relativePosixPath(outDir, join(pi.srcPath, "*")),
        ];
    });
  }

  @Lazy() get tsConfigInfo() {
    const path = join(this.path, "tsconfig.json");
    return {
      path,
      config: JSON.parse(readFileSync(path, "utf-8")) as TsConfig,
    };
  }

  resolvePath(from: string, path: string) {
    const pathInfo = this.pathsInfo.find(pi => path.startsWith(pi.srcPath));
    if (pathInfo) {
      return `@${pathInfo.baseName}/${relativePosixPath(
        pathInfo.srcPath,
        path
      )}`;
    }
    return relativePosixPath(from, path);
  }

  readonly name = basename(CURRENT_PATH);
}
