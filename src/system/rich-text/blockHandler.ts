import { Awaitable } from "@dabsi/common/typings2/Async";
import {
  RichTextBlockData,
  RichTextBlockType,
  RichTextConfig,
} from "@dabsi/system/rich-text/common/types";

export type RichTextBlockHandlerOptions<K extends RichTextBlockType> = {
  pack?(
    config: RichTextConfig,
    unpackedData: RichTextBlockData<K>["unpacked"]
  ): Awaitable<RichTextBlockData<K>["packed"]>;

  unpack?(
    config: RichTextConfig,
    packedData: RichTextBlockData<K>["packed"]
  ): Awaitable<RichTextBlockData<K>["unpacked"]>;

  unpackForReadonly?(
    config: RichTextConfig,
    packedData: RichTextBlockData<K>["packed"]
  ): Awaitable<RichTextBlockData<K>["unpacked"]>;
};

export type RichTextBlockHandler<K extends RichTextBlockType = any> = {
  pack(
    config: RichTextConfig,
    unpackedData: RichTextBlockData<K>["unpacked"]
  ): Awaitable<RichTextBlockData<K>["packed"]>;

  unpack(
    config: RichTextConfig,
    packedData: RichTextBlockData<K>["packed"]
  ): Awaitable<RichTextBlockData<K>["unpacked"]>;

  unpackForReadonly(
    config: RichTextConfig,
    packedData: RichTextBlockData<K>["packed"]
  ): Awaitable<RichTextBlockData<K>["unpacked"]>;
};

export function RichTextBlockHandler<K extends RichTextBlockType>({
  pack = () => <any>null,
  unpack = () => <any>{},
  unpackForReadonly = unpack,
}: RichTextBlockHandlerOptions<K>): RichTextBlockHandler<K> {
  return { pack, unpack, unpackForReadonly };
}
