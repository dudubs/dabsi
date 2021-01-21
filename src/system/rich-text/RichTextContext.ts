/**
 * public entity key =
 *  private user key ^ private config key ^ private entity key
 *
 */
import { touchSet } from "@dabsi/common/map/touchSet";
import { entries } from "@dabsi/common/object/entries";
import { mapObject, mapObjectAsync } from "@dabsi/common/object/mapObject";
import RpcConfigFactoryResolver from "@dabsi/modules/rpc/RpcConfigFactoryResolver";
import RequestSession from "@dabsi/modules/session/RequestSession";
import RichTextModule from "@dabsi/system/rich-text";
import { RichTextConfig } from "@dabsi/system/rich-text/common/RichText";
import RichTextPluginsRpc from "@dabsi/system/rich-text/common/RichTextPluginsRpc";
import { RichTextDocument } from "@dabsi/system/rich-text/entities/Document";
import { RichTextEntity } from "@dabsi/system/rich-text/entities/DocumentEntity";
import RichTextConfigResolver from "@dabsi/system/rich-text/RichTextConfigResolver";
import { RichTextEntityHandler } from "@dabsi/system/rich-text/RichTextEntityHandler";
import { DataResolver } from "@dabsi/system/storage/DataResolver";
import { DataRow } from "@dabsi/typedata/DataRow";
import { DataUnion } from "@dabsi/typedata/DataUnion";
import { Inject, Injectable, ResolverType } from "@dabsi/typedi";

declare global {
  namespace IRichText {
    interface Config {
      context: RichTextContext;
    }
  }
}
const _createPluginsConfigResolver = RpcConfigFactoryResolver(
  RichTextPluginsRpc,
  {
    context: RichTextConfigResolver.provide(),
  }
);

@Injectable()
export class RichTextContext {
  docs = this.data.getSource(RichTextDocument);
  entites = this.data.getSource(RichTextEntity);

  constructor(
    @Inject() public module: RichTextModule,
    @Inject(RequestSession) public session: DataRow<RequestSession>,
    @Inject() public data: DataResolver,
    @Inject(_createPluginsConfigResolver)
    protected _createPluginsConfig: ResolverType<
      typeof _createPluginsConfigResolver
    >
  ) {}

  //
  createPluginsConfig(config: RichTextConfig) {
    return this._createPluginsConfig(
      //
      RichTextConfigResolver.provide(() => config)
    );
  }

  async pack(
    content: Draft.RawDraftContentState
  ): Promise<RichTextPackedContent> {
    const entityTypes = new Set();
    const entityChildren = {};
    const entityChildrenSelection: any = {};
    const entityKeys: string[] = [];

    const unpackedEntities: {
      entityRowKey: string;
      key: string;
      handler: RichTextEntityHandler<any>;
      type: string;
      mutability: Draft.DraftEntityMutability;
      data: any;
    }[] = [];

    for (const [key, { type, data: unpackedData, mutability }] of entries(
      content.entityMap
    )) {
      const handler = this.module.getEntityHandler(type);
      if (touchSet(entityTypes, type)) {
        entityChildren[type] = handler.entityType;
        entityChildrenSelection[type] = handler.packSelection;
      }
      const entityRowKey = handler.packEntityRowKey(unpackedData);

      entityKeys.push(entityRowKey);

      if (!handler.mutability?.[mutability])
        throw new Error(
          `Invalid mutablilty "${mutability}" for entity type "${type}".`
        );

      unpackedEntities.push({
        key,
        entityRowKey,
        handler,
        type,
        mutability,
        data: unpackedData,
      });
    }

    const entityUnion = DataUnion(RichTextEntity, {
      children: entityChildren,
    });

    const entityRowMap = await this.module.data
      .getSource(entityUnion)
      .select({
        pick: [],
        children: entityChildrenSelection,
      })
      .filter({ $is: entityKeys })
      .getRowMap();

    const invalidKeys = new Set<string>();

    const packed: RichTextPackedContent = {
      text: "",

      entityRowKeys: Object.keys(entityRowMap),
      entityMap: {},
      blocks: [],
    };

    for (const {
      handler,
      entityRowKey,
      key,
      mutability: unpackedMutability,
      data: unpackedData,
    } of unpackedEntities) {
      const entityRow = entityRowMap[entityRowKey];
      if (!entityRow) {
        invalidKeys.add(key);
        continue;
      }
      const packedData = await handler.pack(entityRow, unpackedData);
      const packedMutability = RichTextEntityMutablility[unpackedMutability];

      packed.entityMap[key] = [entityRowKey, packedMutability, packedData];
    }

    for (const [
      blockIndex,
      {
        type,
        text,
        data: unpackedData,
        inlineStyleRanges: unpackedStyleRanges,
        depth,
        entityRanges: unpackedEntityRanges,
      },
    ] of content.blocks.entries()) {
      const handler = this.module.getBlockHandler(type);
      const packedData = await handler.pack(unpackedData);

      packed.text += (blockIndex ? "\n" : "") + text.replace(/\n/g, " ");

      const packedStyleRanges: [
        type: string,
        offset: number,
        length: number
      ][] = [];

      const packedEntityRanges: [
        type: number,
        offset: number,
        length: number
      ][] = [];

      for (const { style: type, offset, length } of unpackedStyleRanges) {
        if (!this.module.styleTypes.has(type)) continue;
        packedStyleRanges.push([type, offset, length]);
      }
      for (const { key, offset, length } of unpackedEntityRanges) {
        if (invalidKeys.has(<any>key)) continue;
        packedEntityRanges.push([key, offset, length]);
      }

      packed.blocks.push({
        type,
        depth,
        styleRanges: packedStyleRanges,
        entityRanges: packedEntityRanges,
        data: packedData,
      });
    }

    return packed;
  }

  async unpack(
    docKey: string,
    readonly: boolean
  ): Promise<Draft.RawDraftContentState | null> {
    const doc = await this.docs.get(docKey);
    if (!doc) return null;

    const entityChildrenSelection = {};

    const entityUnion = DataUnion(RichTextEntity, {
      children: mapObject(this.module.entityTypeHandlerMap, (handler, type) => {
        entityChildrenSelection[type] = handler?.unpackSelection;
        return <any>handler!.entityType;
      }),
    });

    const entityRowMap = await this.data
      .getSource(entityUnion)
      .select({ pick: [], children: <any>entityChildrenSelection })
      .getRowMap();

    const blockTextMap = doc.text.split("\n");

    const { blocks: packedBlocks, entityMap: packedEntityMap } = JSON.parse(
      doc.data
    ) as {
      blocks: RichTextPackedBlock[];
      entityMap: Record<string, any>;
    };

    const unpackedEntityMap: Record<any, Draft.RawDraftEntity> = {};
    const unpackedBlocks: Draft.RawDraftContentBlock[] = [];

    for (const [key, [entityRowKey, packedMutability, packedData]] of entries(
      packedEntityMap
    )) {
      const entityRow = entityRowMap[entityRowKey];
      const handler = this.module.getEntityHandler(entityRow.$type);
      const unpackedData = await (readonly
        ? handler.readonlyUnpack
        : handler.unpack)(entityRow, packedData);
      const unpackedMutability = <any>(
        RichTextEntityMutablility[packedMutability]
      );
      unpackedEntityMap[key] = {
        type: entityRow.$type,
        mutability: unpackedMutability,
        data: unpackedData,
      };
    }

    for (const [
      index,
      { type, depth, styleRanges, entityRanges, data },
    ] of packedBlocks.entries()) {
      const handler = this.module.getBlockHandler(type);
      unpackedBlocks.push({
        type,
        key: "b" + index,
        depth,
        data: await (readonly ? handler.readonlyUnpack : handler.unpack)(data),
        text: blockTextMap[index],
        inlineStyleRanges: styleRanges.map(([style, offset, length]) => ({
          style: style as any,
          offset,
          length,
        })),
        entityRanges: entityRanges.map(([key, offset, length]) => ({
          key,
          offset,
          length,
        })),
      });
    }

    return { blocks: unpackedBlocks, entityMap: unpackedEntityMap };
  }
  async insert(content: Draft.RawDraftContentState): Promise<string> {
    const packed = await this.pack(content);

    const docKey = await this.docs.insertKey({
      text: packed.text,
      data: JSON.stringify({
        blocks: packed.blocks,
        entityMap: packed.entityMap,
      }),
      session: this.session.$key,
    });

    await this.docs //
      .at("entities", docKey)
      .add(packed.entityRowKeys);

    return docKey;
  }

  async update(content: Draft.RawDraftContentState, docKey: string) {
    const packed = await this.pack(content);

    await this.docs.update(docKey, {
      text: packed.text,
      data: JSON.stringify({
        blocks: packed.blocks,
        entityMap: packed.entityMap,
      }),
    });

    await this.docs //
      .at("entities", docKey)
      .add(packed.entityRowKeys);

    // remove old entities
    const removedKeys = await this.entites
      .filter({
        $and: [
          { $has: { documents: { $is: docKey } } },
          { $isNot: packed.entityRowKeys },
        ],
      })
      .remove();

    await this.entites
      .filter({ $and: [{ $is: removedKeys }, { $notHas: "documents" }] })
      .delete();
  }
}
export enum RichTextEntityMutablility {
  MUTABLE,
  IMMUTABLE,
  SEGMENTED,
}

export type RichTextStyleRange = [type: string, offset: number, length: number];

export type RichTextEntityRange = [key: number, offset: number, length: number];

export type RichTextPackedBlock = {
  type: string;
  depth: number;
  data: any;
  styleRanges: RichTextStyleRange[];
  entityRanges: RichTextEntityRange[];
};

export type RichTextPackedEntity = [
  entityRowKey: string,
  mutability: RichTextEntityMutablility,
  packedData: any
];
export type RichTextPackedContent = {
  text: string;
  blocks: RichTextPackedBlock[];
  entityMap: Record<string, RichTextPackedEntity>;
  entityRowKeys: string[];
};
