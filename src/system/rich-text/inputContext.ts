import RpcConfigFactoryResolver from "@dabsi/modules/rpc/RpcConfigFactoryResolver";
import RequestSession from "@dabsi/modules/session/RequestSession";
import RichTextModule from "@dabsi/system/rich-text";
import { RichTextConfig } from "@dabsi/system/rich-text/common/types";
import { RichTextRpc } from "@dabsi/system/rich-text/common/rpc";
import { RichTextConfigResolver } from "@dabsi/system/rich-text/configResolver";
import { DataRow } from "@dabsi/typedata/row";
import { Resolver, ResolverType } from "@dabsi/typedi";
import { RpcUnresolvedConfig } from "@dabsi/typerpc/Rpc";

export type RichTextInputContext = ResolverType<typeof RichTextInputContext>;

export const RichTextInputContext = Resolver.object({
  module: RichTextModule,
  session: DataRow(RequestSession),
  createConfig: Resolver.consume(
    {
      createConfig: RpcConfigFactoryResolver(RichTextRpc, {
        context: RichTextConfigResolver.provide(),
      }),
    },
    c => (config: RichTextConfig): RpcUnresolvedConfig<typeof RichTextRpc> =>
      c.createConfig(
        //
        RichTextConfigResolver.provide(() => config)
      )
  ),
});
