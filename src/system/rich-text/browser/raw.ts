import { entries } from "@dabsi/common/object/entries";
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
    content: RichTextContent.Unpacked
  ): Draft.RawDraftContentState {
    return {
      blocks: content.blocks.map(block => {
        const data = { ["block-" + block.type]: block.data };

        for (const [key, value] of entries(block.styleMap)) {
          data["style-" + key] = value;
        }

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
          data,
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
  ): RichTextContent.Unpacked {
    return {
      blocks: content.blocks.map(block => {
        const styleMap = {};
        {
          const p = "style-";
          for (const [key, value] of entries(block.data)) {
            if (key.startsWith(p)) {
              styleMap[key.substr(p.length)] = value;
            }
          }
        }

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
          styleMap,
          data: block.data?.["block-" + block.type] || {},
        };
      }),
      entityMap: mapObject(content.entityMap, entity => {
        return { type: entity.type, data: entity.data };
      }),
    };
  }
}
