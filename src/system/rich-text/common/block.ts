import { Union } from "@dabsi/common/typings2/Union";

declare global {
  namespace IRichText {
    type StyleType<Packed, Unpacked = Packed> = {
      packed: Packed | undefined;
      unpacked: Unpacked | undefined;
    };

    interface BlockStyleTypes {}

    interface BlockDataTypes {}

    interface BlockStyleTypes {}
  }
}

export namespace RichTextBlock {
  export type Type = keyof IRichText.BlockDataTypes;

  export type PackedData<
    K extends Type
  > = IRichText.BlockDataTypes[K]["packed"];

  export type UnpackedData<
    K extends Type
  > = IRichText.BlockDataTypes[K]["unpacked"];

  export type StyleMap = Partial<IRichText.BlockStyleTypes>;

  export type StyleType = keyof IRichText.BlockStyleTypes;

  export type PackedStyle<
    T extends StyleType
  > = IRichText.BlockStyleTypes[T]["packed"];

  export type UnpackedStyle<
    T extends StyleType
  > = IRichText.BlockStyleTypes[T]["unpacked"];

  export type PackedStyleRange = [type: string, offset: number, length: number];

  export type PackedEntityRange = [key: number, offset: number, length: number];

  export type Packed = Union<
    {
      [K in Type]: {
        type: K;
        text: string;
        depth: number;
        key: string;
        /* packedData */
        styleMap: StyleMap;
        data: PackedData<K>;
        styleRanges: PackedStyleRange[];
        entityRanges: PackedEntityRange[];
      };
    }
  >;

  export type Unpacked<T extends Type = Type> = Union<
    {
      [K in T]: {
        type: K;
        text: string;
        key: string;
        depth: number;
        styleRanges: PackedStyleRange[];
        entityRanges: PackedEntityRange[];
        styleMap: StyleMap;
        data: UnpackedData<K>;
      };
    }
  >;
}
