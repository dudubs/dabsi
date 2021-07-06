/**
 * public entity key =
 *  private user key ^ private config key ^ private entity key
 *
 */

import RpcConfigFactoryResolver from "@dabsi/modules/rpc/configFactoryResolver";
import { RequestSession } from "@dabsi/modules/session";
import { DataSourceFactory2 } from "@dabsi/modules/DbModule";
import { RpcModule2 } from "@dabsi/modules/rpc";
import RichTextModule from "@dabsi/system/rich-text";
import { RichTextContent } from "@dabsi/system/rich-text/common/content";
import { RichTextRpc } from "@dabsi/system/rich-text/common/rpc";
import { RichTextConfig } from "@dabsi/system/rich-text/common/types";
import { RichTextConfigContext } from "@dabsi/system/rich-text/configContext";
import { RichTextDocument } from "@dabsi/system/rich-text/entities/Document";
import { RichTextRelation } from "@dabsi/system/rich-text/entities/Relation";
import { RichTextPacker } from "@dabsi/system/rich-text/packer";
import { RichTextUnpacker } from "@dabsi/system/rich-text/unpacker";
import { DataSource } from "@dabsi/typedata/source";
import { Injectable, Resolver } from "@dabsi/typedi";
import { RpcUnresolvedConfig } from "@dabsi/old-typerpc/Rpc";
import { RpcError } from "@dabsi/old-typerpc/RpcError";
import notNull from "@dabsi/common/object/notNull";

declare global {
  namespace IRichText {
    interface Config {
      context: RichTextContext;
    }
  }
}

class RichTextConfigFactory extends RpcConfigFactoryResolver(RichTextRpc, {
  context: Resolver(RichTextConfigContext),
}) {}

@Injectable()
export class RichTextContext {
  docs = this.getDataSource(RichTextDocument);
  rels = this.getDataSource(RichTextRelation);

  constructor(
    public module: RichTextModule,
    public session: RequestSession,
    public getDataSource: DataSourceFactory2,
    protected rpcModule: RpcModule2,
    protected _createRpcConfig: RichTextConfigFactory
  ) {}

  async pack(
    config: RichTextConfig,
    content: RichTextContent.Unpacked,
    docKeyOrSource?: string | DataSource<RichTextDocument>
  ): Promise<string> {
    const packer = new RichTextPacker(config);
    const packedContent = await packer.packContent(content);
    const packedContentText = JSON.stringify(packedContent);

    let docKey: string;

    if (docKeyOrSource) {
      if (typeof docKeyOrSource === "object") {
        ({ $key: docKey } = notNull(await docKeyOrSource.pick([]));
      } else {
        docKey = docKeyOrSource;
      }
      await packer.deleteUnusedRelations(docKey);
      await this.docs.update(docKey, { content: packedContentText });
    } else {
      docKey = await this.docs.insert({
        session: this.session.$key,
        content: packedContentText,
      });
    }

    await packer.insertNewRelations(docKey);
    return docKey;
  }

  async unpack(
    config: RichTextConfig,
    docKeyOrSource: string | DataSource<RichTextDocument>,
    forReadonly: boolean
  ): Promise<RichTextContent.Unpacked> {
    let docSource: DataSource<RichTextDocument>;

    if (typeof docKeyOrSource === "string") {
      const docKey = docKeyOrSource;
      docSource = this.docs.filter({ $is: docKey });
    } else {
      docSource = docKeyOrSource;
    }

    const doc = notNull(await docSource.pick(["content"]).fetch());
    const relationTypeMap = new Map<string, Map<string, any>>();
    for (const rel of await doc
      .at("relations")
      .select(
        <{ pick: ["type"] }>(
          (<any>(
            this.module.createSelection(
              config,
              forReadonly ? "forReadonly" : "forUnpacking"
            )
          ))
        )
      )
      .fetchAll()) {
      relationTypeMap
        .touch(rel.type, () => new Map())
        .set(rel.$key, rel[rel.type]);
    }

    const content = JSON.parse(doc.content!);

    return await new RichTextUnpacker(
      config,
      forReadonly,
      relationTypeMap
    ).unpackContent(content);
  }

  //

  createRpcConfig(
    config: RichTextConfig
  ): RpcUnresolvedConfig<typeof RichTextRpc> {
    return async $ => {
      const rpcConfig = await this._createRpcConfig(
        Resolver(RichTextConfigContext, () => config)
      );
      return $({
        ...rpcConfig,
        getNamespaceConfig(rpc, key, handler) {
          if (!config.editable) {
            if (key.endsWith("-editable")) {
              throw new RpcError(`Rpc "${key}" is only for editable mode.`);
            }
          }
          return rpcConfig.getNamespaceConfig(rpc, key, handler);
        },
      });
    };
  }
}
