import { Field } from "@dabsi/struct/Field";

export function EnumField(options: string[]) {
  const keyToIndex = {};
  for (const [index, key] of options.entries()) {
    keyToIndex[key] = index;
  }
  return {
    options,
    pack(value) {
      if (typeof value === "string") {
        return keyToIndex[value];
      }
    },
    unpack(index) {
      if (typeof index === "number") {
        return options[index];
      }
    },
  };
}

declare module "@dabsi/struct/Field" {
  namespace Field {
    export { EnumField as enum };
  }
}

Field.enum = EnumField;
