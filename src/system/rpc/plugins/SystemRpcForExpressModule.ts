import ExpressModule from "@dabsi/modules/ExpressModule";
import SystemRpcModule from "@dabsi/system/rpc";
import { Inject, Module } from "@dabsi/typedi";

@Module({})
export default class SystemRpcForExpressModule {
  constructor(
    @Inject() sysRpcModule: SystemRpcModule,
    @Inject() em: ExpressModule
  ) {
    em.install({
      run: () => {},
      routes: app => {},
    });
  }
}
