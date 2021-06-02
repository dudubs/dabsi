import { entries } from "@dabsi/common/object/entries";
import { mapObject } from "@dabsi/common/object/mapObject";
import { RichTextContent } from "@dabsi/system/rich-text/common/content";
import { RichTextBlock } from "@dabsi/system/rich-text/common/block";
import { RichTextEntity } from "@dabsi/system/rich-text/common/entity";
import { convertFromRaw, convertToRaw } from "draft-js";

export namespace RichTextEditorRaw {
  export const mutabilityMap: {
    [K in RichTextEntity.Type]?: (
      data: RichTextEntity.UnpackedData<K>
    ) => Draft.DraftEntityMutability;
  } = {};

  // from rt-content to draft-raw-state

  export function toContentState(
    content: RichTextContent.Unpacked
  ): Draft.ContentState {
    return convertFromRaw(toRawContentState(content));
  }
  export function fromContentState(
    content: Draft.ContentState
  ): RichTextContent.Unpacked {
    return fromRawContentState(convertToRaw(content));
  }
  export function toRawContentState(
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
          mutability:
            mutabilityMap[entity.type]?.(entity.data as any) ?? "IMMUTABLE",
          data: entity.data,
        };
      }),
    };
  }

  export function fromRawContentState(
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
      entityMap: <any>mapObject(content.entityMap, entity => {
        return { type: entity.type, data: entity.data };
      }),
    };
  }
}
