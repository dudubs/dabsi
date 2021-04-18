import { callAndWaitAll } from "@dabsi/common/async/callAndWaitAll";
import { Once } from "@dabsi/common/patterns/Once";
import { LoaderModule2 } from "@dabsi/modules2/LoaderModule2";
import path from "path";

export class Platform2 {
  readonly indexFileNames = new Set<string>();

  readonly testsFileNames = new Set<string>();

  readonly directories = new Set<string>();

  readonly loaders: ((dir: string, platform: Platform2) => Promise<void>)[] = [
    async dir => {
      const platformDir = path.join(dir, this.name);
      const platformTestsDir = path.join(platformDir, "tests");
      const [indexFile, testsFiles] = await Promise.all([
        //
        this.loaderModule.resolveIndexFile(platformDir),
        this.loaderModule.readDir(path.join(platformTestsDir)).catch(() => []),
      ]);

      (testsFiles.length || indexFile) && this.directories.add(platformDir);

      indexFile && this.indexFileNames.add(indexFile);

      for (const testFile of testsFiles) {
        if (
          /tests\.tsx?$/i.test(testFile) ||
          /[\\\/]index\.tsx?$/i.test(testFile)
        ) {
          this.testsFileNames.add(testFile);
        }
      }
    },
  ];

  constructor(readonly name: string, readonly loaderModule: LoaderModule2) {}

  @Once() async load() {
    Object.seal(this.loaders);

    await Promise.all(
      this.loaderModule
        .getLoadedDirectories()
        .map(dir => callAndWaitAll(this.loaders, dir, this))
    );
  }
}
