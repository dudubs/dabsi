import { mapObject } from "@dabsi/common/object/mapObject";
import { RichTextContent } from "@dabsi/system/rich-text/common/content";
import { RichTextBlock } from "@dabsi/system/rich-text/common/contentBlock";
import { RichTextEntity } from "@dabsi/system/rich-text/common/contentEntity";

export namespace RichTextRaw {
  export const mutabilityMap: {
    [K in RichTextEntity.Type]?: (
      data: RichTextEntity.UnpackedData<K>
    ) => Draft.DraftEntityMutability;
  } = {};

  export function toDraft(
    content: RichTextContent.Raw
  ): Draft.RawDraftContentState {
    return {
      blocks: content.blocks.map(block => {
        return {
          type: block.type,
          text: block.text,
          key: block.key,
          depth: block.depth,
          inlineStyleRanges: block.styleRanges.map(
            ([style, offset, length]) => ({
              style: style as any,
              offset,
              length,
            })
          ),
          entityRanges: block.entityRanges.map(([key, offset, length]) => ({
            key,
            offset,
            length,
          })),
          data: {},
        };
      }),
      entityMap: mapObject(content.entityMap, entity => {
        return {
          type: entity.type,
          mutability: mutabilityMap[entity.type]?.(entity.data) ?? "IMMUTABLE",
          data: entity.data,
        };
      }),
    };
  }

  export function fromDraft(
    content: Draft.RawDraftContentState
  ): RichTextContent.Raw {
    return {
      blocks: content.blocks.map(block => {
        return {
          type: block.type,
          key: block.key,
          depth: block.depth,
          text: block.text,
          styleRanges: block.inlineStyleRanges.map(
            r => [r.style, r.offset, r.length] as RichTextBlock.PackedStyleRange
          ),
          entityRanges: block.entityRanges.map(
            r => [r.key, r.offset, r.length] as RichTextBlock.PackedEntityRange
          ),
          style: block.data?.style || {},
          data: block.data?.["block-" + block.type] || {},
        };
      }),
      entityMap: mapObject(content.entityMap, entity => {
        return { type: entity.type, data: entity.data };
      }),
    };
  }
}
