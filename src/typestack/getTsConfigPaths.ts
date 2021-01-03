import createTsConfigPaths, {
  TsConfigPaths,
} from "@dabsi/typestack/TsConfigPaths";
import path from "path";

export async function getTsConfigPaths(
  tsConfigPath: string,
  readJsonFile: (path: string) => Promise<any>,
  isFile: (path: string) => Promise<boolean>,
  isDir: (path: string) => Promise<boolean>
): Promise<TsConfigPaths> {
  const tsConfig = await readJsonFile(tsConfigPath);
  const co = tsConfig?.compilerOptions;
  const tsConfigDir = path.dirname(tsConfigPath);
  if (co?.paths) {
    return createTsConfigPaths(
      tsConfigDir,
      co.baseUrl,
      co.paths,
      isFile,
      isDir
    );
  }
  if (tsConfig?.extends) {
    return getTsConfigPaths(
      path.resolve(tsConfigDir, tsConfig.extends),
      readJsonFile,
      isFile,
      isDir
    );
  }
  // default
  return createTsConfigPaths(tsConfigDir, ".", {}, isFile, isDir);
}
