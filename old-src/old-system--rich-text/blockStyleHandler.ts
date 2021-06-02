import { Awaitable } from "@dabsi/common/typings2/Async";
import { RichTextBlock } from "@dabsi/system/rich-text/common/block";
import { RichTextPacker } from "@dabsi/system/rich-text/packer";
import { RichTextUnpacker } from "@dabsi/system/rich-text/unpacker";

interface _HandlerAndOptions<T extends RichTextBlock.StyleType> {
  pack?(
    style: RichTextBlock.UnpackedStyle<T>,
    packer: RichTextPacker
  ): Awaitable<RichTextBlock.PackedStyle<T>>;

  unpack?(
    style: RichTextBlock.PackedStyle<T>,
    unpacker: RichTextUnpacker
  ): Awaitable<RichTextBlock.UnpackedStyle<T>>;
}

export interface RichTextBlockStyleHandler<T extends RichTextBlock.StyleType>
  extends _HandlerAndOptions<T> {}

export interface RichTextBlockStyleOptions<T extends RichTextBlock.StyleType>
  extends _HandlerAndOptions<T> {}
