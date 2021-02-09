import { Awaitable } from "@dabsi/common/typings2/Async";
import { Union } from "@dabsi/common/typings2/Union";
import { RichTextPacker } from "@dabsi/system/rich-text/packer";
import { RichTextUnpacker } from "@dabsi/system/rich-text/unpacker";

declare global {
  namespace IRichText {
    interface EntityDataTypes {}
  }
}
export namespace RichTextEntity {
  export type Type = keyof IRichText.EntityDataTypes;

  export interface HandlerAndOptions<T extends Type = Type> {
    readonlyKeys?: (string & keyof RichTextEntity.UnpackedData<T>)[];
    pack(
      data: RichTextEntity.UnpackedData<T>,
      packer: RichTextPacker
    ): Awaitable<RichTextEntity.PackedData<T>>;

    unpack(
      data: RichTextEntity.PackedData<T>,
      unpacker: RichTextUnpacker
    ): Awaitable<RichTextEntity.UnpackedData<T>>;
  }

  export type PackedMutablility = Draft.DraftEntityMutability;

  export interface Handler<T extends Type = Type> extends HandlerAndOptions<T> {
    type: T;
  }

  export interface Options<T extends Type = Type>
    extends HandlerAndOptions<T> {}

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
        mutability: PackedMutablility;
        data: RichTextEntity.PackedData<K>;
      };
    }
  >;

  export type Raw<T extends Type = Type> = Union<
    {
      [K in T]: {
        type: K;
        data: RichTextEntity.UnpackedData<K>;
      };
    }
  >;

  export type Unpacked = Union<
    {
      [K in Type]: {
        type: K;
        mutability: Draft.DraftEntityMutability;
        data: RichTextEntity.UnpackedData<K>;
      };
    }
  >;
}
