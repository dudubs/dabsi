import { Awaitable } from "@dabsi/common/typings2/Async";
import { RichTextBlock } from "@dabsi/system/rich-text/common/block";
import { RichTextPacker } from "@dabsi/system/rich-text/packer";
import { RichTextUnpacker } from "@dabsi/system/rich-text/unpacker";

export type _Type = RichTextBlock.Type;

interface _HandlerAndOptions<T extends _Type = _Type> {
  readonlyKeys?: (string & keyof RichTextBlock.UnpackedData<T>)[];
  pack?(
    data: RichTextBlock.UnpackedData<T>,
    packer: RichTextPacker
  ): Awaitable<RichTextBlock.PackedData<T>>;
}

export interface RichTextBlockOptions<T extends _Type = _Type>
  extends _HandlerAndOptions<T> {
  unpack?(
    data: RichTextBlock.PackedData<T>,
    unpacker: RichTextUnpacker
  ): Awaitable<RichTextBlock.UnpackedData<T>>;
}

export interface RichTextBlockHandler<T extends _Type = _Type>
  extends _HandlerAndOptions<T> {
  unpack(
    data: RichTextBlock.PackedData<T>,
    unpacker: RichTextUnpacker
  ): Awaitable<RichTextBlock.UnpackedData<T>>;
}
