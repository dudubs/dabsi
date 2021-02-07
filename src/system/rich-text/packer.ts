import mapArrayAsync from "@dabsi/common/array/mapArrayAsync";
import { mapObject, mapObjectAsync } from "@dabsi/common/object/mapObject";
import {
  RichTextConfig,
  RichTextRelationTypeKey,
} from "@dabsi/system/rich-text/common/types";
import { RichTextContent } from "@dabsi/system/rich-text/content";
import { RichTextBlock } from "@dabsi/system/rich-text/contentBlock";
import { RichTextEntity } from "@dabsi/system/rich-text/contentEntity";
import { RichTextRelation } from "@dabsi/system/rich-text/entities/Relation";
import { DataInsert } from "@dabsi/typedata/value";

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

    const styles = mapObject(
      <any>block.data.styles || {},
      (style, styleKey) => {
        this.module.getBlockStyleHandler(styleKey).validate?.(style);
        return style;
      }
    );

    const data: any = await handler.pack(this, <any>block.data);

    const styleRanges = block.inlineStyleRanges.map(
      ({ style, offset, length }) =>
        [style, offset, length] as RichTextBlock.PackedStyleRange
    );

    const entityRanges = block.entityRanges.map(
      ({ key, offset, length }) =>
        [key, offset, length] as RichTextBlock.PackedEntityRange
    );

    return {
      type: block.type,
      text: block.text,
      depth: block.depth,
      styles,
      key: block.key,
      data,
      styleRanges: styleRanges.length ? styleRanges : undefined,
      entityRanges: entityRanges.length ? entityRanges : undefined,
    };
  }

  async packEntity(
    entity: RichTextEntity.Unpacked
  ): Promise<RichTextEntity.Packed> {
    const handler = this.module.getEntityHandler(entity.type);
    return {
      type: entity.type,
      mutability: entity.mutability,
      data: <any>await handler.pack(this, entity.data!),
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
