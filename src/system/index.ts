import { Cli } from "@dabsi/modules/Cli";
import { Inject, Module, Resolver } from "@dabsi/typedi";
import RequestModule from "../modules/RequestModule";
import RpcModule from "../modules/rpc";
import SessionModule from "../modules/session";
import { SystemRpc } from "./common/SystemRpc";

@Module({
  dependencies: [SessionModule],
})
export default class SystemModule {
  log = log.get("SYSTEM");

  constructor(
    @Inject() protected requestModule: RequestModule,
    @Inject() protected rpcModule: RpcModule,
    @Inject() cli: Cli
  ) {
    cli.command(
      "check",
      cli => cli.onRun(() => this.check()) //
    );
  }

  async check() {
    this.log.trace(`Checking..`);
    Resolver.check(
      this.rpcModule.getRpcConfigResolver(SystemRpc),
      this.requestModule.context
    );
  }
}
