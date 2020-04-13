import {readdirSync, statSync} from "fs";
import {join} from "path";

export function* findFilesSync(dirName: string) {
    for (const baseName of readdirSync(dirName)) {
        const path = join(dirName, baseName)
        if (statSync(path).isDirectory()) {
            yield* findFilesSync(path)
        } else {
            yield path
        }
    }
}
