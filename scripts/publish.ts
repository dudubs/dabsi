import {execSync} from "child_process";
import {writeFileSync} from "fs";
import {join, relative, resolve} from "path";
import * as yargs from "yargs";
import {DABSI_PATH} from "../server/framework";
import {touchDirSync} from "../server/fs/touchDir";

const DIST_PATH = resolve(DABSI_PATH, "dist")

const folder = "json-expr";
const srcPath = resolve(DABSI_PATH, folder);
const distName = folder.replace(/[\/\\]+/g, '-')
const pkName = `@dabsi/${distName}`;
const distPath = resolve(DIST_PATH, distName);

if (require.main === module) (async ({}) => {


})(yargs
    .command('all', '', y => y, async () => {


        touchDirSync(distPath);


        writeJSONConfig("package.json", {
            name: pkName,
            main: "index.js",
            license: "MIT",
            version: '1.0.1'
        });

        writeJSONConfig("tsconfig.json", {
            extends: relPath(join(DABSI_PATH, "tsconfig.json")),
            compilerOptions: {
                outDir: relPath(distPath),
                declaration: true,
                declarationDir: relPath(distPath),
                noEmit: false,
            },
            include: [
                relPath(resolve(srcPath, "index.ts"))
            ],
            exclude: [
                "**/*.test.*"
            ]
        });

        execSync(`tsc -p ${resolve(distPath, "tsconfig.json")}`, {
            stdio: "inherit"
        });

        function relPath(path) {
            return relative(distPath, path) || "."
        }

        function writeJSONConfig(path: string, data) {

            writeFileSync(resolve(distPath, path),
                JSON.stringify(data, null, 2));
        }


    }).argv);
