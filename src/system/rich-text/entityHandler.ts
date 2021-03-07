import { Awaitable } from "@dabsi/common/typings2/Async";
import { RichTextEntity } from "@dabsi/system/rich-text/common/entity";
import { RichTextPacker } from "@dabsi/system/rich-text/packer";
import { RichTextUnpacker } from "@dabsi/system/rich-text/unpacker";

type _Type = RichTextEntity.Type;

interface _HandlerAndOptions<T extends _Type = _Type> {
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

export interface RichTextEntityHandler<T extends _Type = _Type>
  extends _HandlerAndOptions<T> {
  type: T;
}

export interface RichTextEntityOptions<T extends _Type = _Type>
  extends _HandlerAndOptions<T> {}
