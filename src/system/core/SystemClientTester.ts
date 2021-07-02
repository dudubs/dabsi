import { defined } from "@dabsi/common/object/defined";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { SessionCookie } from "@dabsi/modules/session";
import SystemRpc from "@dabsi/system/core/common/rpc";
import SystemCommand from "@dabsi/system/core/common/SystemCommand";
import SystemTests from "@dabsi/system/core/SystemTests";
import { Resolver, ResolverMap } from "@dabsi/typedi";

let _lockSystemCommand = false;

declare global {
  interface ISystemClientTester extends ThisType<SystemClientTester> {}
}

export interface SystemClientTester extends ISystemClientTester {}

export class SystemClientTester {
  protected _cookie: any = undefined;

  createContext() {
    return Resolver.Context.create(
      SystemTests.module.moduleRunner.context,
      Resolver(SessionCookie, () => ({
        get: () => {
          return this._cookie;
        },
        define: value => {
          this._cookie = value;
        },
      }))
    );
  }

  processRequest<T>(
    callback: (context: ResolverMap) => Awaitable<T>
  ): Promise<T | undefined> {
    return SystemTests.module.serverModule.processRequest(
      this.createContext(),
      callback
    );
  }

  async use<T>(callback: () => Awaitable<T>): Promise<T> {
    if (_lockSystemCommand) {
      throw new Error("rpc handling is locked.");
    }
    _lockSystemCommand = true;
    SystemCommand.handle(async payloads => {
      return defined(
        await this.processRequest(context => {
          return SystemTests.module.rpcModule.processMultipleRequests(
            SystemRpc,
            payloads,
            {},
            context
          );
        }),
        () => `No rpc-responses`
      );
    });
    try {
      return callback();
    } finally {
      _lockSystemCommand = false;
    }
  }
}

export default SystemClientTester;
