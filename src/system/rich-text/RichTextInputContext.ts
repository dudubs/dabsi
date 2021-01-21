import RpcConfigFactoryResolver from "@dabsi/modules/rpc/RpcConfigFactoryResolver";
import RequestSession from "@dabsi/modules/session/RequestSession";
import RichTextModule from "@dabsi/system/rich-text";
import { RichTextConfig } from "@dabsi/system/rich-text/common/RichText";
import RichTextPluginsRpc from "@dabsi/system/rich-text/common/RichTextPluginsRpc";
import RichTextConfigResolver from "@dabsi/system/rich-text/RichTextConfigResolver";
import { DataRow } from "@dabsi/typedata/DataRow";
import { Resolver, ResolverType } from "@dabsi/typedi";
import { RpcUnresolvedConfig } from "@dabsi/typerpc/Rpc";

export type RichTextInputContext = ResolverType<typeof RichTextInputContext>;

export const RichTextInputContext = Resolver.object({
  module: RichTextModule,
  session: DataRow(RequestSession),
  createConfig: Resolver.consume(
    {
      createConfig: RpcConfigFactoryResolver(RichTextPluginsRpc, {
        context: RichTextConfigResolver.provide(),
      }),
    },
    c => (
      config: RichTextConfig
    ): RpcUnresolvedConfig<typeof RichTextPluginsRpc> =>
      c.createConfig(
        //
        RichTextConfigResolver.provide(() => config)
      )
  ),
});
