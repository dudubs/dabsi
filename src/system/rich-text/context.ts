/**
 * public entity key =
 *  private user key ^ private config key ^ private entity key
 *
 */
import { DataContext } from "@dabsi/modules/data/context";
import RpcModule from "@dabsi/modules/rpc";
import RpcConfigFactoryResolver from "@dabsi/modules/rpc/RpcConfigFactoryResolver";
import RequestSession from "@dabsi/modules/session/RequestSession";
import RichTextModule from "@dabsi/system/rich-text";
import { RichTextRpc } from "@dabsi/system/rich-text/common/rpc";
import { RichTextConfig } from "@dabsi/system/rich-text/common/types";
import { RichTextConfigResolver } from "@dabsi/system/rich-text/configResolver";
import { RichTextContent } from "@dabsi/system/rich-text/content";
import { RichTextDocument } from "@dabsi/system/rich-text/entities/Document";
import { RichTextRelation } from "@dabsi/system/rich-text/entities/Relation";
import { RichTextPacker } from "@dabsi/system/rich-text/packer";
import { RichTextUnpacker } from "@dabsi/system/rich-text/unpacker";
import { DataRow } from "@dabsi/typedata/row";
import {
  Inject,
  Injectable,
  Resolver,
  ResolverContext,
  ResolverType,
} from "@dabsi/typedi";
import { RpcConfig } from "@dabsi/typerpc/Rpc";

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
    @Inject(c => c) protected context: ResolverContext
  ) {}

  async pack(
    config: RichTextConfig,
    content: RichTextContent.Unpacked,
    docKey?: string
  ): Promise<string> {
    const packer = new RichTextPacker(config);
    const packedContent = JSON.stringify(await packer.packContent(content));
    if (!docKey) {
      docKey = await this.docs.insertKey({
        session: this.session.$key,
        content: packedContent,
      });
    } else {
      await packer.deleteUnusedRelations(docKey);
      await this.docs.update(docKey, { content: packedContent });
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
    const doc = await this.docs.pick(["content"]).getOrFail();
    const content = JSON.parse(doc.content);
    return await new RichTextUnpacker(
      config,
      forReadonly,
      relationTypeEntityMap
    ).unpackContent(content);
  }

  //

  createRpcConfig(config: RichTextConfig): RpcConfig<typeof RichTextRpc> {
    return {
      getNamespaceConfig: (rpc, key) => {
        if (key.endsWith("-editable")) {
          if (!config.editable) {
            throw new Error(`Not editable.`);
          }
        }
        const rpcConfigResolver = this.rpcModule.getRpcConfigResolver(rpc);
        const rpcConfig = Resolver.resolve(
          rpcConfigResolver,
          Resolver.createContext(
            this.context,
            RichTextConfigResolver.provide(() => config)
          )
        );
        return rpcConfig;
      },
    };
  }
}
