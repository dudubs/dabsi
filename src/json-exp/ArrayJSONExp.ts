import {WeakId} from "../common/WeakId";
import {JSONExp} from "./JSONExp";
import {NativeJSONExpTranslator} from "./NativeJSONExp";

export function ArrayJSONExp<T>(value: T, exp: JSONExp<T>): any {
    return new NativeJSONExpTranslator<T>(WeakId).translate(exp)(value)
}
