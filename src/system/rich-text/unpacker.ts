import mapArrayAsync from "@dabsi/common/array/mapArrayAsync";
import { mapObjectAsync } from "@dabsi/common/object/mapObject";
import { pick } from "@dabsi/common/object/pick";
import { RichTextBlock } from "@dabsi/system/rich-text/common/contentBlock";
import {
  RichTextConfig,
  RichTextRelationType,
  RichTextRelationTypeKey,
} from "@dabsi/system/rich-text/common/types";
import { DataRow } from "@dabsi/typedata/row";
import { RichTextContent } from "@dabsi/system/rich-text/common/content";
import { RichTextEntity } from "@dabsi/system/rich-text/common/contentEntity";

export class RichTextUnpacker {
  context = this.config.context;
  module = this.context.module;

  constructor(
    public config: RichTextConfig,
    public forReadonly,
    protected relationTypeEntityMap: Map<string, Map<string, any>>
  ) {}

  unpackRelation<K extends RichTextRelationTypeKey>(
    typeKey: K,
    entityKey: string
  ): DataRow<RichTextRelationType<K>> | undefined {
    return this.relationTypeEntityMap.get(typeKey)?.get(entityKey);
  }

  async unpackBlack(
    block: RichTextBlock.Packed
  ): Promise<RichTextBlock.Unpacked> {
    const handler = this.module.getBlockHandler(block.type);

    let data: any = await handler.unpack(block.data, this);

    if (this.forReadonly && handler.readonlyKeys?.length) {
      data = pick(data, handler.readonlyKeys);
    }
    const styleMap = await mapObjectAsync(block.styleMap, (style, type) => {
      const handler = this.module.getBlockStyleHandler(<any>type);
      if (handler.unpack) {
        return handler.unpack(style, this);
      }
      return style;
    });

    return {
      type: block.type,
      styleMap,
      data,
      text: block.text,
      key: block.key,
      depth: block.depth || 0,
      styleRanges: block.styleRanges,
      entityRanges: block.entityRanges,
    };
  }

  async unpackEntity(
    entity: RichTextEntity.Packed
  ): Promise<RichTextEntity.Unpacked> {
    const handler = this.module.getEntityHandler(entity.type);
    let data: any = await handler.unpack(entity.data, this);
    if (this.forReadonly && handler.readonlyKeys?.length) {
      data = pick(data, handler.readonlyKeys);
    }

    return {
      type: entity.type,
      data,
    };
  }

  async unpackContent(
    content: RichTextContent.Packed
  ): Promise<RichTextContent.Unpacked> {
    return {
      blocks: await mapArrayAsync(content.blocks, block =>
        this.unpackBlack(block)
      ),
      entityMap: await mapObjectAsync(content.entityMap, entity =>
        this.unpackEntity(entity)
      ),
    };
  }
}
