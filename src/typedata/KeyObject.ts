import {entries} from "../common/object/entries";
import {sliceString} from "../common/string/sliceString";
import {split} from "../common/string/split";

export type KeyObject = Record<string, any>;

export namespace KeyObject {

    export function stringify(
        keyObject: KeyObject
    ) {
        let text = '';
        for (const [key, value] of entries(keyObject)) {
            text += (text ? "," : "") + key + "=" +
                encodeURIComponent(String(value))
        }
        return text;
    }

    export function parse(text: string): KeyObject {
        const obj = {};
        for (const part of split(text, ",")) {
            const [key, value] = sliceString(part, "=");
            obj[key]=decodeURIComponent(value)
        }
        return obj;
    }

}
