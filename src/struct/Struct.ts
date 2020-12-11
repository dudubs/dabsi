import { mapObject } from "../common/object/mapObject";
import "./Field";
import { Field, AsField, AsFieldType, ToField } from "./Field";

export type TStruct = Record<string, AsField<any>>;

export type StructProps<T extends TStruct> = {
  [K in keyof T]: AsFieldType<T[K]>;
};

export interface Struct<T extends TStruct> extends Field<Struct<T>> {
  fields: {
    [K in keyof T]: Field<AsFieldType<T[K]>>;
  };
  (value?): StructProps<T> & ToField<Struct<T>>;
  new (value?): StructProps<T> & ToField<Struct<T>>;
}

export function Struct<T extends TStruct>(fields: T): Struct<T> {
  struct.fields = mapObject(fields, (field: any) => Field(field));

  struct.prototype.toField = function (): Field<any> {
    const defaultValue = this;
    return {
      pack(value) {
        return struct.pack(value);
      },
      unpack(value) {
        return struct.unpack(
          mapObject(
            struct.fields,
            (_, key) => value?.[key] ?? defaultValue[key]
          )
        );
      },
    };
  };

  struct.pack = function (value) {
    return mapObject(this.fields, (field, key) => field.pack(value?.[key]));
  };

  struct.unpack = function (value) {
    return Object.setPrototypeOf(
      mapObject(this.fields, (field, key) => {
        return field.unpack(value?.[key]);
      }),
      this.prototype
    );
  };
  return struct as any;
  function struct(this, value) {
    return struct.unpack(value);
  }
}
