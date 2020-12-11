import { Field, ToField } from "./Field";

export function PrimitiveField<T>(
  type: (value: any) => T
): Field<T | undefined> {
  return {
    pack(value) {
      return value;
    },
    unpack(value) {
      if (value != null) return type(value);
    },
  };
}

declare module "./Field" {
  namespace Field {
    let primitive: typeof PrimitiveField;
  }
}

declare global {
  interface String extends ToField<string> {}
  interface Number extends ToField<number> {}
  interface Boolean extends ToField<boolean> {}
  interface StringConstructor extends ToField<string | undefined> {}
  interface NumberConstructor extends ToField<number | undefined> {}
  interface BooleanConstructor extends ToField<boolean | undefined> {}
}

Field.primitive = PrimitiveField;

[String, Boolean, Number].forEach(
  (type: ToField<any> & { prototype: ToField<any>; (value): any }) => {
    type.prototype.toField = function () {
      const defaultValue = this;
      return {
        pack(value) {
          return value;
        },
        unpack(value) {
          if (value != null) return type(value);
          return defaultValue;
        },
      };
    };

    type.toField = function () {
      return PrimitiveField(this);
    };
  }
);
