import { MapFactory } from "@dabsi/common/map/mapFactory";
import { entries } from "@dabsi/common/object/entries";
import { mapObject } from "@dabsi/common/object/mapObject";
import { Lazy } from "@dabsi/common/patterns/lazy";
import { posixPath, relativePosixPath } from "@dabsi/modules/pathHelpers";
import { TsConfig } from "@dabsi/modules/TsConfig";
import { existsSync, readFileSync } from "fs";
import path from "path";

export class TsConfigInfo {
  constructor(public fileName: string) {}

  @Lazy() get config(): TsConfig {
    return JSON.parse(readFileSync(this.fileName, "utf-8")) as TsConfig;
  }

  dirName = path.dirname(this.fileName);

  @Lazy() get pathResolvers() {
    const paths = getConfigPaths(this.fileName) || {};
    const resolvers: {
      template: { start: string; end: string };
      path: { start: string; end: string };
    }[] = [];
    for (const [template, templatePaths] of entries(paths || {})) {
      for (let templatePath of templatePaths) {
        const [start, end] = templatePath.split("*");
        const [startTemplate, endTemplate] = template.split("*");
        resolvers.push({
          template: { start: startTemplate, end: endTemplate || "" },
          path: { start: path.resolve(this.dirName, start), end: end || "" },
        });
      }
    }
    return resolvers;
  }

  resolvePath(from: string, tsPath: string) {
    for (const pathResolver of this.pathResolvers) {
      if (tsPath.startsWith(pathResolver.path.start)) {
        const toPathLessStart = tsPath
          .slice(pathResolver.path.start.length)
          .replace(/\.(js|ts)x?$/, "");
        return posixPath(
          path.join(pathResolver.template.start, toPathLessStart) +
            pathResolver.path.end
        );
      }
    }
    return relativePosixPath(from, tsPath);
  }
}

function getConfigPaths(fileName: string) {
  const text = readFileSync(fileName, "utf8");
  const config = JSON.parse(text);

  const co = config?.compilerOptions;
  if (co?.paths) {
    const baseUrl = path.resolve(path.dirname(fileName), co.baseUrl);
    return mapObject(co.paths as Record<string, string[]>, tsPaths =>
      tsPaths.map(tsPath => path.resolve(baseUrl, tsPath))
    );
  }
  if (typeof config?.extends === "string") {
    return getConfigPaths(path.resolve(path.dirname(fileName), config.extends));
  }
}
