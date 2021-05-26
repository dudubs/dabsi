import callAndWaitForAll from "@dabsi/common/async/callAndWaitForAll";
import { Defined } from "@dabsi/common/patterns/Defined";
import { Once } from "@dabsi/common/patterns/Once";
import { Awaitable } from "@dabsi/common/typings2/Async";
import LoaderModule from "@dabsi/modules/LoaderModule";
import { Stats } from "fs";
import path from "path";

export type PlatformLoader = (event: {
  baseName: string;
  fileName: string;
  stats: Stats;
  platformDir: string;
  platform: Platform;
}) => Awaitable;

export default class Platform {
  @Defined()
  indexFileNames!: string[];

  @Defined()
  testsFileNames!: string[];

  @Defined()
  directories!: string[];

  readonly settings = {
    includeInternalFiles: false,
    includeTestsFiles: true,
    isViewPlatform: false,
  };

  private _indexFilesLoader: PlatformLoader = ({ baseName, fileName }) => {
    if (!/^index.tsx?$/.test(baseName)) return;
    this.indexFileNames.push(fileName);
  };

  private _internalFilesLoader: PlatformLoader = ({
    baseName,
    stats,
    fileName,
  }) => {
    if (!this.settings.includeInternalFiles) return;

    if (!baseName.startsWith("_")) return;
    if (!stats.isFile()) return;
    if (!/\.tsx?$/.test(baseName)) return;
    this.indexFileNames.push(fileName);
  };

  private _testsFilesLoader: PlatformLoader = async ({
    baseName,
    stats,
    fileName,
  }) => {
    if (!this.settings.includeTestsFiles) return;
    if (stats.isDirectory() && baseName === "tests") {
      for (const baseName of await this.loaderModule.readDir(fileName)) {
        if (
          /tests\.tsx?$/i.test(baseName) ||
          /[\\\/]index\.tsx?$/i.test(baseName)
        ) {
          this.testsFileNames.push(path.join(fileName, baseName));
        }
      }
    }
  };

  readonly loaders: PlatformLoader[] = [
    this._indexFilesLoader,
    this._internalFilesLoader,
    this._testsFilesLoader,
  ];

  constructor(readonly name: string, readonly loaderModule: LoaderModule) {}

  @Once() async load() {
    [this.directories, this.testsFileNames, this.indexFileNames] = [[], [], []];

    for (const o of [this.loaders, this.settings]) {
      Object.seal(o);
    }

    await Promise.all(
      this.loaderModule.getLoadedDirectories().map(async moduleDir => {
        const platformDir = path.join(moduleDir, this.name);

        const platformFiles = await this.loaderModule
          .readDir(platformDir)
          .catch(() => null);

        if (!platformFiles) return;

        this.directories.push(platformDir);

        await Promise.all(
          platformFiles.toSeq().map(async baseName => {
            const fileName = path.join(platformDir, baseName);
            return callAndWaitForAll(this.loaders, {
              baseName,
              fileName,
              platformDir,
              platform: this,
              stats: await this.loaderModule.stat(fileName),
            });
          })
        );
      })
    );

    for (const o of [
      this.directories,
      this.testsFileNames,
      this.indexFileNames,
    ]) {
      Object.seal(o);
    }
  }
}
