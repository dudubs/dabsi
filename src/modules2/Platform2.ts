import { callAndWaitAll } from "@dabsi/common/async/callAndWaitAll";
import { Once } from "@dabsi/common/patterns/Once";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { LoaderModule2 } from "@dabsi/modules2/LoaderModule2";
import { Stats } from "fs";
import path from "path";

export type PlatformLoader = (event: {
  baseName: string;
  fileName: string;
  stats: Stats;
  platformDir: string;
  platform: Platform2;
}) => Awaitable;

export class Platform2 {
  readonly indexFileNames = new Set<string>();

  readonly testsFileNames = new Set<string>();

  readonly directories = new Set<string>();

  includeInternalFiles = false;

  includeTestsFiles = true;

  constructor(readonly name: string, readonly loaderModule: LoaderModule2) {}

  indexFilesLoader: PlatformLoader = ({ baseName, fileName }) => {
    if (!/^index.tsx?$/.test(baseName)) return;
    this.indexFileNames.add(fileName);
  };

  internalFilesLoader: PlatformLoader = ({ baseName, stats, fileName }) => {
    if (!this.includeInternalFiles) return;
    if (!baseName.startsWith("_")) return;
    if (!stats.isFile()) return;
    if (!/\.tsx?/.test(baseName)) return;

    this.indexFileNames.add(fileName);
  };

  testsFilesLoader: PlatformLoader = async ({ baseName, stats, fileName }) => {
    if (!this.includeTestsFiles) return;
    if (stats.isDirectory() && baseName === "tests") {
      for (const baseName of await this.loaderModule.readDir(fileName)) {
        if (
          /tests\.tsx?$/i.test(baseName) ||
          /[\\\/]index\.tsx?$/i.test(baseName)
        ) {
          this.testsFileNames.add(path.join(fileName, baseName));
        }
      }
    }
  };

  readonly loaders: PlatformLoader[] = [
    this.indexFilesLoader,
    this.internalFilesLoader,
    this.testsFilesLoader,
  ];

  @Once() async load() {
    Object.seal(this.loaders);
    Object.seal(this);

    await Promise.all(
      this.loaderModule.getLoadedDirectories().map(async moduleDir => {
        const platformDir = path.join(moduleDir, this.name);

        const platformFiles = await this.loaderModule
          .readDir(platformDir)
          .catch(() => null);

        if (!platformFiles) return;

        this.directories.add(platformDir);

        await Promise.all(
          platformFiles.toSeq().map(async baseName => {
            const fileName = path.join(platformDir, baseName);
            return callAndWaitAll(this.loaders, {
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
  }
}
function join(join: any) {
  throw new Error("Function not implemented.");
}
