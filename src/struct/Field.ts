export interface Field<T> {
  pack(value: T): any;
  unpack(value: any): T;
}

export interface ToField<T> {
  toField(): Field<T>;
}

export type AsField<T> = Field<T> | ToField<T>;

// FieldLike
export type AsFieldType<T extends AsField<any>> = T extends AsField<infer U>
  ? U
  : never;

export type FieldType<T extends Field<any>> = T extends Field<infer U>
  ? U
  : never;

export function Field<T>(input: AsField<T>): Field<T> {
  if (typeof (input as ToField<any>)?.toField === "function") {
    return (input as ToField<T>).toField();
  }
  return input as Field<T>;
}
