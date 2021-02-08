/**
 * public entity key =
 *  private user key ^ private config key ^ private entity key
 *
 */
import { DataContext } from "@dabsi/modules/data/context";
import RpcModule from "@dabsi/modules/rpc";
import RequestSession from "@dabsi/modules/session/RequestSession";
import RichTextModule from "@dabsi/system/rich-text";
import { RichTextRpc } from "@dabsi/system/rich-text/common/rpc";
import { RichTextConfig } from "@dabsi/system/rich-text/common/types";
import { RichTextConfigResolver } from "@dabsi/system/rich-text/configResolver";
import { RichTextContent } from "@dabsi/system/rich-text/common/content";
import { RichTextDocument } from "@dabsi/system/rich-text/entities/Document";
import { RichTextRelation } from "@dabsi/system/rich-text/entities/Relation";
import { RichTextPacker } from "@dabsi/system/rich-text/packer";
import { RichTextUnpacker } from "@dabsi/system/rich-text/unpacker";
import { DataRow } from "@dabsi/typedata/row";
import { Inject, Injectable, Resolver, ResolverContext } from "@dabsi/typedi";
import { RpcConfig } from "@dabsi/typerpc/Rpc";
import RpcConfigFactoryResolver, {
  RpcConfigFactory,
} from "@dabsi/modules/rpc/RpcConfigFactoryResolver";

declare global {
  namespace IRichText {
    interface Config {
      context: RichTextContext;
    }
  }
}

@Injectable()
export class RichTextContext {
  docs = this.data.getSource(RichTextDocument);
  rels = this.data.getSource(RichTextRelation);

  constructor(
    public module: RichTextModule,
    @Inject(RequestSession) public session: DataRow<RequestSession>,
    public data: DataContext,
    protected rpcModule: RpcModule,
    @Inject(
      RpcConfigFactoryResolver(RichTextRpc, {
        context: RichTextConfigResolver.provide(),
      })
    )
    protected _createRpcConfig: RpcConfigFactory<typeof RichTextRpc>
  ) {}

  async pack(
    config: RichTextConfig,
    content: RichTextContent.Unpacked,
    docKey?: string
  ): Promise<string> {
    const packer = new RichTextPacker(config);
    const packedContent = await packer.packContent(content);
    const packedContentText = JSON.stringify(packedContent);

    if (!docKey) {
      docKey = await this.docs.insertKey({
        session: this.session.$key,
        content: packedContentText,
      });
    } else {
      await packer.deleteUnusedRelations(docKey);
      await this.docs.update(docKey, { content: packedContentText });
    }
    await packer.insertNewRelations(docKey);
    return docKey;
  }

  async unpack(
    config: RichTextConfig,
    docKey: string,
    forReadonly: boolean
  ): Promise<RichTextContent.Unpacked> {
    const relationTypeEntityMap = new Map<string, Map<string, any>>();
    for (const rel of await this.rels
      .filter({ $at: { document: { $is: docKey } } })
      .select(
        this.module.createSelection(
          config,
          forReadonly ? "forReadonly" : "forUnpacking"
        )
      )
      .getRows()) {
      relationTypeEntityMap
        .touch(rel.type, () => new Map())
        .set(rel.$key, rel[rel.type]);
    }
    const doc = await this.docs
      .filter({ $is: docKey })
      .pick(["content"])
      .getOrFail();
    const content = JSON.parse(doc.content);

    return await new RichTextUnpacker(
      config,
      forReadonly,
      relationTypeEntityMap
    ).unpackContent(content);
  }

  //

  createRpcConfig(config: RichTextConfig): RpcConfig<typeof RichTextRpc> {
    const rpcConfig = this._createRpcConfig(
      RichTextConfigResolver.provide(() => config)
    );
    return {
      ...rpcConfig,
      getNamespaceConfig: (rpc, key, handler) => {
        if (!config.editable) {
          config.context.module.assertReadonlyRpc(rpc);
        }
        return rpcConfig.getNamespaceConfig(rpc, key, handler);
      },
    };
  }
}
