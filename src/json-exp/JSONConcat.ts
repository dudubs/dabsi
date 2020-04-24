// JSONConcat`{"firstName"} {"$last}`
import {Seq} from "immutable";
import {JSONExp} from "./JSONExp";

export function JSONConcat<T>(strings: TemplateStringsArray, ...exps: JSONExp<T>[]) {
    return {
        $concat: Seq.Indexed(strings).flatMap(($value, index) =>
            exps[index] === undefined ? [{$value}] :
                [{$value}, exps[index]]
        ).toArray()
    }
}
