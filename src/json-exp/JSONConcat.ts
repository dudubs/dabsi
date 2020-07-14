// JSONConcat`{"firstName"} {"$last}`
import {Seq} from "immutable";
import {DataExp} from "./DataExp";

export function JSONConcat<T>(strings: TemplateStringsArray, ...exps: DataExp<T>[]) {
    return {
        $concat: Seq.Indexed(strings).flatMap(($value, index) =>
            exps[index] === undefined ? [{$value}] :
                [{$value}, exps[index]]
        ).toArray()
    }
}
