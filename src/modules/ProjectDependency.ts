import { ImmutableMap } from "@dabsi/common/immutable";
import Lazy from "@dabsi/common/patterns/Lazy";
import { TsConfigPaths2 } from "@dabsi/typestack/TsConfigPaths2";

import { entries } from "lodash";
import path from "path";

export class ProjectDependency {
  readonly configsDir = path.join(this.dir, "configs");

  readonly srcDir = path.join(this.dir, "src");

  readonly projectDependencyMap = new Map<string, ProjectDependency>();

  readonly name = path.basename(this.dir);

  constructor(readonly dir: string, readonly paths: TsConfigPaths2) {}

  @Lazy() get allProjectDependencyMap(): ImmutableMap<
    string,
    ProjectDependency
  > {
    return [this as ProjectDependency]
      .toSeq()
      .flatMap(function* flat(pd): IterableIterator<ProjectDependency> {
        yield pd;
        for (const spd of pd.projectDependencyMap.values()) {
          yield* flat(spd);
        }
      })
      .map(p => [p.dir, p] as const)
      .fromEntrySeq()
      .toMap();
  }

  static async load(
    rootPaths: TsConfigPaths2,
    rootDir: string
  ): Promise<ProjectDependency> {
    const cache = new Map();
    return load(rootPaths, rootDir);
    async function load(rootPaths: TsConfigPaths2, rootDir: string) {
      if (cache.has(rootDir)) return cache.get(rootDir);

      const rootPd = new ProjectDependency(rootDir, rootPaths);
      cache.set(rootDir, rootPd);

      for (const [tsPath, fsPaths] of entries(
        rootPaths.createPathsWithBaseUrl(rootDir).paths
      )) {
        const relProjectDir = fsPaths
          .find(fsPath => /[\\\/]src[\\\/]\*$/.test(fsPath))
          ?.replace(/[\\\/]src[\\\/]\*$/, "");
        if (!relProjectDir) continue;

        const projectDir = path.resolve(rootDir, relProjectDir);
        const projectName = tsPath.match(/^\@([^\\\/]+)[\\\/]\*$/)?.[1];
        if (!projectName) continue;

        console.log({ projectName });

        const paths = new TsConfigPaths2(rootPaths.fs);
        await paths.load(path.join(projectDir, "tsconfig.json"));
        const pd = await load(paths, projectDir);
        rootPd.projectDependencyMap.set(rootDir, pd);
      }
      return rootPd;
    }
  }
}
