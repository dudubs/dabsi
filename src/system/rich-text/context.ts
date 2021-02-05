/**
 * public entity key =
 *  private user key ^ private config key ^ private entity key
 *
 */
import { touchSet } from "@dabsi/common/map/touchSet";
import { entries } from "@dabsi/common/object/entries";
import { mapObject } from "@dabsi/common/object/mapObject";
import { DataContext } from "@dabsi/modules/data/context";
import RpcConfigFactoryResolver from "@dabsi/modules/rpc/RpcConfigFactoryResolver";
import RequestSession from "@dabsi/modules/session/RequestSession";
import RichTextModule from "@dabsi/system/rich-text";
import { RichTextConfig } from "@dabsi/system/rich-text/common/types";
import { RichTextRpc } from "@dabsi/system/rich-text/common/rpc";
import { RichTextDocument } from "@dabsi/system/rich-text/entities/Document";
import { RichTextEntity } from "@dabsi/system/rich-text/entities/DocumentEntity";
import { RichTextConfigResolver } from "@dabsi/system/rich-text/configResolver";
import { RichTextEntityHandler } from "@dabsi/system/rich-text/entityHandler";
import { DataRow } from "@dabsi/typedata/row";
import { DataUnion } from "@dabsi/typedata/union";
import { Inject, Injectable, ResolverType } from "@dabsi/typedi";

declare global {
  namespace IRichText {
    interface Config {
      context: RichTextContext;
    }
  }
}
const _createPluginsConfigResolver = RpcConfigFactoryResolver(RichTextRpc, {
  context: RichTextConfigResolver.provide(),
});

@Injectable()
export class RichTextContext {
  docs = this.data.getSource(RichTextDocument);
  entites = this.data.getSource(RichTextEntity);

  constructor(
    public module: RichTextModule,
    @Inject(RequestSession) public session: DataRow<RequestSession>,
    public data: DataContext,
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

  async pack2() {}

  async pack(
    config: RichTextConfig,
    content: Draft.RawDraftContentState
  ): Promise<RichTextPackedContent> {
    const entityTypes = new Set();
    const entityChildMap = {};
    const entityChildSelectionMap: any = {};
    const entityKeys: string[] = [];

    const unpackedEntities: {
      entityKey: string;
      key: string;
      handler: RichTextEntityHandler<any>;
      type: string;
      mutability: Draft.DraftEntityMutability;
      data: any;
    }[] = [];

    const invalidKeys = new Set<string>();

    for (const [nKey, { type, data: unpackedData, mutability }] of entries(
      content.entityMap
    )) {
      const key = String(nKey);
      const handler = this.module.getEntityHandler(type);

      const entityKey = await handler.packEntityKey(
        unpackedData,
        this.data.getSource(<any>handler.entityType)
      );

      if (!entityKey) {
        invalidKeys.add(key);
        continue;
      }

      if (touchSet(entityTypes, type)) {
        entityChildMap[type] = handler.entityType;
        entityChildSelectionMap[type] = handler.packSelection;
      }
      entityKeys.push();

      if (!handler.mutability?.[mutability])
        throw new Error(
          `Invalid mutablilty "${mutability}" for entity type "${type}".`
        );

      unpackedEntities.push({
        key,
        entityKey,
        handler,
        type,
        mutability,
        data: unpackedData,
      });
    }

    const entityUnion = DataUnion(RichTextEntity, {
      children: entityChildMap,
    });

    const entityRowMap = await this.module.data
      .getSource(entityUnion)
      .select({
        pick: [],
        children: entityChildSelectionMap,
      })
      .filter({ $is: entityKeys })
      .getRowMap();

    console.log({ entityKeys });

    const packed: RichTextPackedContent = {
      text: "",
      entityKeys: Object.keys(entityRowMap),
      entityMap: {},
      blocks: [],
    };

    for (const {
      handler,
      entityKey,
      key,
      mutability: unpackedMutability,
      data: unpackedData,
    } of unpackedEntities) {
      const entityRow = entityRowMap[entityKey];

      if (!entityRow) {
        invalidKeys.add(key);
        continue;
      }
      const packedData = await handler.pack(config, entityRow, unpackedData);
      const packedMutability = RichTextEntityMutablility[unpackedMutability];

      packed.entityMap[key] = [entityKey, packedMutability, packedData];
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
      const packedData = await handler.pack(config, unpackedData);

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
        if (!this.module.styleTypes.has(type)) {
          throw new Error(`not-allowed style "${type}".`);
        }
        packedStyleRanges.push([type, offset, length]);
      }
      for (const { key, offset, length } of unpackedEntityRanges) {
        if (invalidKeys.has(String(key))) continue;
        packedEntityRanges.push([key, offset, length]);
      }

      packed.blocks.push({
        type,
        depth: depth || undefined,
        styleRanges: packedStyleRanges.length ? packedStyleRanges : undefined,
        entityRanges: packedEntityRanges.length
          ? packedEntityRanges
          : undefined,
        data: packedData ?? undefined,
      });
    }

    return packed;
  }

  async unpack(
    config: RichTextConfig,
    docKey: string,
    readonly: boolean
  ): Promise<Draft.RawDraftContentState | null> {
    const doc = await this.docs.get(docKey);
    if (!doc) return null;

    const entityChildSelectionMap = {};

    const entityUnion = DataUnion(RichTextEntity, {
      children: mapObject(this.module.entityTypeHandlerMap, (handler, type) => {
        entityChildSelectionMap[type] = readonly
          ? handler!.readonlySelection
          : handler!.unpackSelection;
        return <any>handler!.entityType;
      }),
    });

    const entityRowMap = await this.data
      .getSource(entityUnion)
      .filter({ $has: { documents: { $is: docKey! } } })
      .select({ pick: [], children: <any>entityChildSelectionMap })
      .getRowMap();

    console.log({ entityRowMap });

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
        ? handler.unpackForReadonly
        : handler.unpack)(config, entityRow, packedData);
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
        depth: depth || 0,
        data: await (readonly ? handler.unpackForReadonly : handler.unpack)(
          config,
          data
        ),
        text: blockTextMap[index],
        inlineStyleRanges: (styleRanges || []).map(
          ([style, offset, length]) => ({
            style: style as any,
            offset,
            length,
          })
        ),
        entityRanges: (entityRanges || []).map(([key, offset, length]) => ({
          key,
          offset,
          length,
        })),
      });
    }

    return { blocks: unpackedBlocks, entityMap: unpackedEntityMap };
  }

  async insert(
    config: RichTextConfig,
    content: Draft.RawDraftContentState
  ): Promise<string> {
    const packed = await this.pack(config, content);

    const docKey = await this.docs.insertKey({
      text: packed.text,
      data: JSON.stringify({
        blocks: packed.blocks,
        entityMap: packed.entityMap,
      }),
      session: this.session.$key,
    });

    console.log({ x: packed.entityKeys });

    await this.docs //
      .at("entities", docKey)
      .add(packed.entityKeys);

    return docKey;
  }

  async update(
    config: RichTextConfig,
    docKey: string,
    content: Draft.RawDraftContentState
  ) {
    const packed = await this.pack(config, content);

    await this.docs.update(docKey, {
      text: packed.text,
      data: JSON.stringify({
        blocks: packed.blocks,
        entityMap: packed.entityMap,
      }),
    });

    const oldEntityKeys: string[] = [];
    const newEntityKeys: string[] = [];

    const currentEntityKeys = new Set(
      await this.docs.at("entities", docKey).getKeys()
    );
    const packedEntityKeys = new Set(packed.entityKeys);

    for (const entityKey of packed.entityKeys) {
      if (!currentEntityKeys.has(entityKey)) {
        newEntityKeys.push(entityKey);
      }
    }
    for (const entityKey of currentEntityKeys) {
      if (!packedEntityKeys.has(entityKey)) {
        oldEntityKeys.push(entityKey);
      }
    }

    const docEntities = this.docs.at("entities", docKey);
    // remove old entities
    await docEntities.add(newEntityKeys);
    await docEntities.remove(oldEntityKeys);

    // TODO: register RichTextEntity as resource without handler.
    await this.entites
      .filter({ $and: [{ $is: oldEntityKeys }, { $notHas: "documents" }] })
      .delete();
  }

  async deleteDocument(config: RichTextConfig, docKey: string) {
    const entityKeys = await this.docs.at("entities", docKey).getKeys();
    await this.docs.delete(docKey);
    await this.entites
      .filter({ $and: [{ $is: entityKeys }, { $notHas: "documents" }] })
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
  depth: number | undefined;
  data: Record<string, any> | undefined;
  styleRanges: RichTextStyleRange[] | undefined;
  entityRanges: RichTextEntityRange[] | undefined;
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
  entityKeys: string[];
};
