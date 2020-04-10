import {deserialize, serialize} from "bson";

function buildArrays(obj) {
    if (obj&&(typeof obj === "object")) {
        if (0 in obj) {
            let arr: any[] = [];
            for (let index = 0; index in obj; index++) {
                arr[index] = buildArrays(obj[index]);
            }
            return arr;
        }

    }
    return obj;
}


export namespace BSON {

    export function unpack<T = any>(buffer: Buffer): T {
        return buildArrays(deserialize(buffer))?.raw
    }

    export function pack(data: any): Buffer {
        return serialize({raw: data})
    }
}
