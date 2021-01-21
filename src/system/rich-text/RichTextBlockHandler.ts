import { Awaitable } from "@dabsi/common/typings2/Async";
import {
  RichTextBlockData,
  RichTextBlockType,
} from "@dabsi/system/rich-text/common/RichText";

export type RichTextBlockHandlerOptions<K extends RichTextBlockType> = {
  pack?(
    unpackedData: RichTextBlockData<K>["unpacked"]
  ): Awaitable<RichTextBlockData<K>["packed"]>;

  unpack?(
    packedData: RichTextBlockData<K>["packed"]
  ): Awaitable<RichTextBlockData<K>["unpacked"]>;

  readonlyUnpack?(
    packedData: RichTextBlockData<K>["packed"]
  ): Awaitable<RichTextBlockData<K>["unpacked"]>;
};

export type RichTextBlockHandler<K extends RichTextBlockType = any> = {
  pack(
    unpackedData: RichTextBlockData<K>["unpacked"]
  ): Awaitable<RichTextBlockData<K>["packed"]>;

  unpack(
    packedData: RichTextBlockData<K>["packed"]
  ): Awaitable<RichTextBlockData<K>["unpacked"]>;

  readonlyUnpack(
    packedData: RichTextBlockData<K>["packed"]
  ): Awaitable<RichTextBlockData<K>["unpacked"]>;
};

export function RichTextBlockHandler<K extends RichTextBlockType>({
  pack = () => <any>null,
  unpack = () => <any>{},
  readonlyUnpack = unpack,
}: RichTextBlockHandlerOptions<K>): RichTextBlockHandler<K> {
  return { pack, unpack, readonlyUnpack };
}
