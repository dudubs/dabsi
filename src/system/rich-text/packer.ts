import mapArrayAsync from "@dabsi/common/array/mapArrayAsync";
import { mapObject, mapObjectAsync } from "@dabsi/common/object/mapObject";
import {
  RichTextConfig,
  RichTextRelationTypeKey,
} from "@dabsi/system/rich-text/common/types";
import { RichTextContent } from "@dabsi/system/rich-text/common/content";
import { RichTextBlock } from "@dabsi/system/rich-text/common/contentBlock";
import { RichTextEntity } from "@dabsi/system/rich-text/common/contentEntity";
import { RichTextRelation } from "@dabsi/system/rich-text/entities/Relation";
import { DataInsert } from "@dabsi/typedata/value";
import { entries } from "@dabsi/common/object/entries";

export class RichTextPacker {
  context = this.config.context;
  module = this.context.module;

  constructor(public config: RichTextConfig) {}

  protected relationTypeKeyMap = new Map<string, Set<string>>();

  packRelation<K extends RichTextRelationTypeKey>(
    typeKey: K,
    entityKey: string
  ) {
    this.relationTypeKeyMap.touch(typeKey, () => new Set()).add(entityKey);
  }

  async deleteUnusedRelations(docKey: string) {
    const unsuedRelationKeys: string[] = [];
    for (const relation of await this.context.rels
      .of("document", docKey)
      .select(this.module.createSelection(this.config, "forPacking"))
      .getRows()) {
      const relationEntityKeys = this.relationTypeKeyMap.get(relation.type);
      if (!relationEntityKeys) {
        // entity removed from this document
        unsuedRelationKeys.push(relation.$key);
        continue;
      }
      const relationEntityKey = relation[relation.type].$key;
      if (relationEntityKeys.has(relationEntityKey)) {
        // document still using this relation entity, so dont insert again.
        relationEntityKeys.delete(relationEntityKey);
        continue;
      }
    }
    await this.context.rels.delete(unsuedRelationKeys);
  }

  async insertNewRelations(docKey: string) {
    const rows: DataInsert<RichTextRelation>[] = [];
    for (const [typeKey, entityKeys] of this.relationTypeKeyMap.entries()) {
      for (const entityKey of entityKeys) {
        rows.push({
          document: docKey,
          type: typeKey,
          [typeKey]: entityKey,
        });
      }
    }
    await this.context.rels.insertKey(rows);
  }

  async packBlock(
    block: RichTextBlock.Unpacked
  ): Promise<RichTextBlock.Packed> {
    const handler = this.module.getBlockHandler(block.type);

    const styleMap = {};
    for (const [type, value] of entries(block.styleMap)) {
      const handler = this.module.getBlockStyleHandler(<any>type);
      const packedValue = await handler.pack(value, this);
      if (packedValue !== undefined) {
        styleMap[type] = packedValue;
      }
    }

    const data: any = await handler.pack(block.data, this);

    for (const [style, offset, length] of block.styleRanges) {
      // TOOD: validate
    }

    for (const [key, offset, length] of block.entityRanges) {
      // TOOD: validate
    }

    return {
      type: block.type,
      text: block.text,
      depth: block.depth,
      styleMap,
      key: block.key,
      data,
      styleRanges: block.styleRanges,
      entityRanges: block.entityRanges,
    };
  }

  async packEntity(
    entity: RichTextEntity.Unpacked
  ): Promise<RichTextEntity.Packed> {
    const handler = this.module.getEntityHandler(entity.type);

    return {
      type: entity.type,
      data: <any>await handler.pack(entity.data!, this),
    };
  }
  async packContent(
    content: RichTextContent.Unpacked
  ): Promise<RichTextContent.Packed> {
    return {
      blocks: await mapArrayAsync(content.blocks, block =>
        this.packBlock(block)
      ),
      entityMap: await mapObjectAsync(content.entityMap, async entity =>
        this.packEntity(entity)
      ),
    };
  }
}
