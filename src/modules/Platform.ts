import callAndWaitForAll from "@dabsi/common/async/callAndWaitForAll";
import { Defined } from "@dabsi/common/patterns/Defined";
import { Once } from "@dabsi/common/patterns/Once";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { ModuleTarget } from "@dabsi/typemodule/ModuleRunner";
import { Badge } from "@material-ui/core";
import { Stats } from "fs";
import path from "path";
import PlatformContext from "./PlatformContext";

export type PlatformLoaderEvent = {
  baseName: string;
  fileName: string;
  dirName: string;
  stats: Stats;
  platform: Platform;
};

export type PlatformLoaderFn = (event: PlatformLoaderEvent) => Awaitable;

export type ModuleDirectorieMap = Map<string, undefined | ModuleTarget>;

export default class Platform {
  constructor(readonly context: PlatformContext, readonly name: string) {}

  @Defined()
  indexFileNames!: string[];

  @Defined()
  testsFiles!: string[];

  @Defined()
  directories!: string[];

  @Defined()
  projectDirectoriesMap!: Map<string, string[]>;

  readonly options = {
    includeInternalFiles: false,
    includeTestsFiles: true,
    isViewPlatform: false,
  };

  readonly loaders: PlatformLoaderFn[] = [
    event => this._loadIndexFiles(event),

    event =>
      this.options.includeInternalFiles && //
      this._loadInternalFiles(event),

    event =>
      this.options.includeTestsFiles && //
      this._loadTestsFiles(event),
  ];

  protected _loadIndexFiles({ baseName, fileName }: PlatformLoaderEvent) {
    if (!/^index.tsx?$/.test(baseName)) return;
    this.indexFileNames.push(fileName);
  }

  protected async _loadInternalFiles(event: PlatformLoaderEvent) {
    for await (const sourceFileName of this.context.findInternalFiles(event)) {
      this.indexFileNames.push(sourceFileName);
    }
  }

  protected async _loadTestsFiles(event: PlatformLoaderEvent) {
    for await (const testsFile of this.context.getTestsFiles(event)) {
      this.testsFiles.push(testsFile);
    }
  }

  @Once() async load() {
    [
      this.directories,
      this.testsFiles,
      this.indexFileNames,
      this.projectDirectoriesMap,
    ] = [[], [], [], new Map()];

    for (const o of [this.loaders, this.options]) {
      Object.seal(o);
    }

    await Promise.all(
      this.context.loaderModule.getLoadedDirectories().map(async moduleDir => {
        const dirName = path.join(moduleDir, this.name);

        const platformFiles = await this.context.loaderModule
          .readDir(dirName)
          .catch(() => null);

        if (!platformFiles) return;

        const projectDir = dirName.split(/[\\\/]+src[\\\/]+/, 1)[0];
        if (projectDir !== dirName) {
          this.projectDirectoriesMap.touch(projectDir, () => []).push(dirName);
        }

        this.directories.push(dirName);

        await Promise.all(
          platformFiles.toSeq().map(async baseName => {
            const fileName = path.join(dirName, baseName);
            return callAndWaitForAll(this.loaders, {
              baseName,
              dirName,
              fileName,
              platform: this,
              stats: await this.context.loaderModule.stat(fileName),
            });
          })
        );
      })
    );

    for (const o of [
      this.directories,
      this.testsFiles,
      this.indexFileNames,
      this.projectDirectoriesMap,
    ]) {
      Object.seal(o);
    }
  }
}
