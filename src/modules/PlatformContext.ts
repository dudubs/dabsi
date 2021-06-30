import Lazy from "@dabsi/common/patterns/Lazy";
import Touch from "@dabsi/common/patterns/Touch";
import LoaderModule from "@dabsi/modules/LoaderModule";
import ProjectModule from "@dabsi/modules/ProjectModule";
import { Injectable } from "@dabsi/typedi";
import ModuleMetadata from "@dabsi/typemodule/ModuleMetadata";
import { ModuleRunner, ModuleTarget } from "@dabsi/typemodule/ModuleRunner";
import fs from "fs";
import path from "path";
import { ModuleDirectorieMap, PlatformLoaderEvent } from "./Platform";

@Injectable()
export default class PlatformContext {
  constructor(
    readonly loaderModule: LoaderModule,
    readonly projectModule: ProjectModule,
    readonly moduleRunner: ModuleRunner
  ) {}

  @Lazy() get moduleDirectorieMap(): ModuleDirectorieMap {
    const map: ModuleDirectorieMap = new Map();

    for (const target of this.moduleRunner.getLoadedModules()) {
      const metadata = ModuleMetadata.get(target);
      map.set(metadata.directory, target);
    }
    return map;
  }

  getModuleTargetByDirectory(dir: string): ModuleTarget | undefined {
    if (this.moduleDirectorieMap.has(dir)) {
      return this.moduleDirectorieMap.get(dir);
    }
    const baseDir = path.dirname(dir);
    if (baseDir === dir) return;
    const target = this.getModuleTargetByDirectory(baseDir);
    this.moduleDirectorieMap.set(dir, target);
    return target;
  }

  async *getTestsFiles({ stats, baseName, fileName }: PlatformLoaderEvent) {
    if (stats.isDirectory() && baseName === "tests") {
      for (const baseName of await this.loaderModule.readDir(fileName)) {
        if (
          /tests\.tsx?$/i.test(baseName) ||
          /[\\\/]index\.tsx?$/i.test(baseName)
        ) {
          yield path.join(fileName, baseName);
        }
      }
    }
    return false;
  }

  async *findInternalFiles(event: PlatformLoaderEvent) {
    if (!event.baseName.startsWith("_")) return;

    const sourceFileName = event.stats.isFile()
      ? event.fileName
      : await this.loaderModule.resolveIndexFile(event.fileName);

    console.log({ sourceFileName });

    if (sourceFileName && (await this.isInternalFile(sourceFileName))) {
      yield sourceFileName;
    }
  }

  @Touch() async isInternalFile(sourceFileName: string) {
    // TODO: More deep
    const source = await fs.promises.readFile(sourceFileName, "utf-8");
    const tsPaths = await this.projectModule.getPaths();
    for (const { groups } of source.matchAll(
      /^(import\s+"(?<module>[^"]+)"|import\s+.*(?<=from\s+)"(?<fromModule>[^"]+)")/g
    )) {
      const moduleName = groups!.module || groups!.fromModule;
      const modulePath = await tsPaths.resolveFsPath(
        moduleName,
        path.dirname(sourceFileName)
      );

      if (!modulePath) continue;

      const moduleTarget = this.getModuleTargetByDirectory(
        path.dirname(modulePath)
      );
      if (!moduleTarget) continue;

      if (!this.moduleRunner.hasInstance(moduleTarget)) {
        log.info(
          () =>
            `Skipping ${sourceFileName} because no ${moduleTarget.name} instance.`
        );
        return false;
      }

      if (!(await this.isInternalFile(modulePath))) {
        return false;
      }
    }
    return true;
  }
}
