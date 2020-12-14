import path, { relative } from "path";
import { readFileSync } from "fs";
import { DABSI_SRC_PATH } from "./../index";
import { readdirRecursiveSync } from "../filesystem/readdirRecursiveSync";

if (require.main === module)
  (async () => {
    console.log("X");

    for (const fileName of readdirRecursiveSync(DABSI_SRC_PATH)) {
      const fileSource = readFileSync(fileName, "utf8");
      const fileDir = path.dirname(fileName);
      const fileFixedSource = fileSource.replace(
        /(?<type>import|from) "(?<path>[^"\n]+)";/,
        (...args) => {
          let { type, path: importPath } = args[args.length - 1] as {
            path: string;
            type: "import" | "from";
          };

          if (importPath.startsWith(".")) {
            const importRelativePath = importPath;
            const importAbsolutePath = path.resolve(
              fileDir,
              importRelativePath
            );
            if (importAbsolutePath.startsWith(DABSI_SRC_PATH)) {
              importPath =
                "@dabsi/" +
                importAbsolutePath
                  .slice(DABSI_SRC_PATH.length + 1)
                  .replace(/\\/g, "/");
            }
          }
          return `${type} "${importPath}";`;
        }
      );

      if (fileFixedSource !== fileSource) {
        console.log({ fileName });
      }
    }
  })();
