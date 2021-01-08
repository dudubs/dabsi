import { Awaitable } from "@dabsi/common/typings2/Async";
import { Cli } from "@dabsi/modules/Cli";
import { DbModule } from "@dabsi/modules/DbModule";
import { Hookable } from "@dabsi/modules/Hookable";
import { Inject, Module } from "@dabsi/typedi";
import { AnyRpc, RpcUnresolvedConfig } from "@dabsi/typerpc/Rpc";

export class RichTextPlugins {
  buildInputElement = Hookable<
    (config: RichTextInputConfig, element: RichTextInputElement) => Awaitable
  >();

  configureInputRpc<T extends AnyRpc>(
    rpc: T,
    getConfig: (config: RichTextInputConfig) => RpcUnresolvedConfig<T>
  ) {}

  getInputRpcConfig<T extends AnyRpc>(
    config: RichTextInputConfig,
    rpc: T
  ): RpcUnresolvedConfig<T> {
    throw new Error();
  }
}
@Module({
  dependencies: [DbModule],
})
export default class RichTextModule {
  install = Hookable<(plugins: RichTextPlugins) => void>();

  plugins!: RichTextPlugins;

  constructor(@Inject() cli: Cli) {
    cli.command("start", cli => {
      cli.onRun(() => {
        this.plugins = new RichTextPlugins();
        this.install.invoke(this.plugins);
      });
    });
  }
}
