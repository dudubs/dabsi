import { readFileSync } from "fs";
import path from "path";
import { entries } from "@dabsi/common/object/entries";
import { Lazy } from "@dabsi/common/patterns/lazy";
import { posixPath, relativePosixPath } from "@dabsi/modules/pathHelpers";
import { TsConfig } from "@dabsi/modules/TsConfig";

export class TsConfigInfo {
  constructor(public fileName: string) {}

  @Lazy() get config(): TsConfig {
    return JSON.parse(readFileSync(this.fileName, "utf-8")) as TsConfig;
  }

  dirName = path.dirname(this.fileName);

  @Lazy() get pathResolvers() {
    const resolvers: {
      template: { start: string; end: string };
      path: { start: string; end: string };
    }[] = [];
    for (const [template, templatePaths] of entries(
      this.config.compilerOptions!.paths!
    )) {
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
