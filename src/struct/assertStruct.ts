import {Type} from "../common/typings";
import {assertValidation} from "../validators/assertValidation";
import {validateStruct} from "./validateStruct";

export function assertStruct<T>(structType: Type<T>, struct): asserts struct is T {
    assertValidation(validateStruct(structType, struct))
}
