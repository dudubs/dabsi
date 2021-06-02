import { Union } from "@dabsi/common/typings2/Union";

declare global {
  namespace IRichText {
    interface EntityDataTypes {}
  }
}

export namespace RichTextEntity {
  export type Type = keyof IRichText.EntityDataTypes;

  export type PackedData<
    K extends Type
  > = IRichText.EntityDataTypes[K]["packed"];

  export type UnpackedData<
    K extends Type
  > = IRichText.EntityDataTypes[K]["unpacked"];

  export type Packed = Union<
    {
      [K in Type]: {
        type: K;
        data: RichTextEntity.PackedData<K>;
      };
    }
  >;

  export type Unpacked<T extends Type = Type> = Union<
    {
      [K in T]: {
        type: K;
        data: RichTextEntity.UnpackedData<K>;
      };
    }
  >;
}
