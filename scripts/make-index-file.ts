import {existsSync, readFileSync, writeFileSync} from "fs";
import {relative, resolve} from "path";
import * as yargs from "yargs";
import {findFilesSync} from "../src/server/fs/findFilesSync";


export function makeIndexFile(outDirName: string, rootDirNames: string[]) {

    const moduleNames: string[] = [];

    for (const rootDirName of rootDirNames) {
        for (const fileName of findFilesSync(rootDirName)) {
            if (!/\.d.ts$/.test(fileName)) {
                continue;
            }
            if (/\.test\.d.ts$/.test(fileName))
                continue;

            moduleNames.push('./' + relative(outDirName, fileName).replace(/\\/g, '/')
                .replace(/\.d\.ts/, ''))

        }
    }

    writeFileSync(resolve(outDirName, "index.d.ts"), moduleNames
        .map(moduleName => `export * from "${moduleName}";`)
        .join('\n'));

    writeFileSync(resolve(outDirName, "index.js"), `module.exports = {${
        moduleNames
            .map(moduleName => `...require("${moduleName}"),`)
            .join('\n')
    }}`);
}

if (require.main === module) (async ({_: [dirName]}) => {
    const pkFileName = resolve(dirName, "package.json");
    if (existsSync(pkFileName)) {
        const pkData: { dabsi: { index?: string[] } } = JSON.parse(readFileSync(pkFileName, "utf8"));
        const rootDirNames = pkData?.dabsi?.index?.map(
            baseName => resolve(dirName, baseName)
        );
        rootDirNames && makeIndexFile(dirName, rootDirNames)
    }
})(yargs.argv);
