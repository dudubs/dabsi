import { Awaitable } from "@dabsi/common/typings2/Async";
import { Union } from "@dabsi/common/typings2/Union";
import { RichTextPacker } from "@dabsi/system/rich-text/packer";
import { RichTextUnpacker } from "@dabsi/system/rich-text/unpacker";

declare global {
  namespace IRichText {
    type EntityDataType<
      Packed extends object = {},
      Unpacked extends object = Packed,
      Common extends object = {}
    > = {
      packed: Packed & Common;
      unpacked: Unpacked & Common;
    };

    interface EntityDataTypes {}
  }
}
export namespace RichTextEntity {
  export type Type = keyof IRichText.EntityDataTypes;

  export interface HandlerAndOptions<T extends Type = Type> {
    readonlyKeys?: (string & keyof RichTextEntity.UnpackedData<T>)[];
    pack(
      packer: RichTextPacker,
      unpackedData: RichTextEntity.UnpackedData<T>
    ): Awaitable<RichTextEntity.PackedData<T>>;

    unpack(
      unpacker: RichTextUnpacker,
      packedData: RichTextEntity.PackedData<T>
    ): Awaitable<RichTextEntity.UnpackedData<T>>;
  }

  export type PackedMutablility = Draft.DraftEntityMutability;

  export interface Handler<T extends Type = Type>
    extends HandlerAndOptions<T> {}

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
