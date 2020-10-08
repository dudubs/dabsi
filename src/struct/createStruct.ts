import { Type } from "../common/typings";
import { ValidationError } from "../validators/ValidationError";
import { createStructField } from "./createStructField";
import { getStructFields } from "./getStructFields";

export declare type StructProps<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<StructProps<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<StructProps<U>>
    : StructProps<T[P]>;
};

export function createStruct<T>(
  structType: Type<T>,
  props: StructProps<T> = {}
): T {
  const struct: any = {};

  for (const field of getStructFields(structType)) {
    let value = props[field.propertyKey];

    try {
      value = createStructField(field, value);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new ValidationError(
          () =>
            `At ${field.propertyKey} (of ${
              field.target.name
            }): \n\t${error.reason().replace(/\n\t/g, "\n\t\t")}`
        );
      }
      throw error;
    }

    if (value !== undefined) struct[field.propertyKey] = value;
  }

  return struct;
}
