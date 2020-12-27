import path, { relative } from "path";
import { readFileSync, writeFileSync } from "fs";
import { DABSI_SRC_PATH } from "@dabsi/index";
import { readdirRecursiveSync } from "@dabsi/filesystem/readdirRecursiveSync";

export default async function ({ write }) {
  for (const fileName of readdirRecursiveSync(DABSI_SRC_PATH)) {
    const fileSource = readFileSync(fileName, "utf8");
    const fileDir = path.dirname(fileName);
    const fileFixedSource = fileSource.replace(
      /(?<type>import|from|module) "(?<path>[^"\n]+)"/g,
      (...args) => {
        const { type, path: originalImportPath } = args[args.length - 1] as {
          path: string;
          type: "import" | "from";
        };

        let importPath = originalImportPath;

        if (importPath.startsWith(".")) {
          const importRelativePath = importPath;
          const importAbsolutePath = path.resolve(fileDir, importRelativePath);
          if (importAbsolutePath.startsWith(DABSI_SRC_PATH)) {
            importPath =
              "@dabsi/" +
              importAbsolutePath
                .slice(DABSI_SRC_PATH.length + 1)
                .replace(/\\/g, "/");
          }

          if (importPath !== originalImportPath) {
            console.log(`Fix "${originalImportPath}" to "${importPath}"`);
          }
        }
        return `${type} "${importPath}"`;
      }
    );

    if (write && fileFixedSource !== fileSource) {
      writeFileSync(fileName, fileFixedSource);
    }
  }
}
