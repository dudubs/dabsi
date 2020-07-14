import {Type} from "../common/typings";
import {Validation} from "../validators/Validation";
import {validateStruct} from "./validateStruct";

export function assertStruct<T>(structType: Type<T>, struct): asserts struct is T {
    Validation.assert(validateStruct(structType, struct))
}
