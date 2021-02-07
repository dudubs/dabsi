import LoaderModule from "@dabsi/modules/LoaderModule";
import { RpcTester } from "@dabsi/modules/rpc/tests/tester";
import { SESSION_TIMEOUT } from "@dabsi/modules/session";
import getCurrentTime from "@dabsi/modules/session/getCurrentTime";
import RequestSession from "@dabsi/modules/session/RequestSession";
import DbTester from "@dabsi/modules/tests/DbTester";
import RichTextModule from "@dabsi/system/rich-text";
import { RichTextConfig } from "@dabsi/system/rich-text/common/types";
import { RichTextConfigResolver } from "@dabsi/system/rich-text/configResolver";
import { RichTextContext } from "@dabsi/system/rich-text/context";
import ModuleTester from "@dabsi/system/rich-text/tests/ModuleTester";
import { TestStorage } from "@dabsi/system/rich-text/tests/TestStorage";
import Storage from "@dabsi/system/storage/Storage";
import { DataRow } from "@dabsi/typedata/row";
import { ModuleTarget } from "@dabsi/typedi";

export default function RichTextTester({
  modules = [] as ModuleTarget[],
} = {}) {
  const t = ModuleTester();
  const db = DbTester(t);
  const rpc = RpcTester(t);
  return t.beforeAll(async t => {
    const rtModule = await t.moduleRunner.getInstance(RichTextModule);

    t.provide(Storage.provide(() => new TestStorage()));

    for (const module of modules) {
      t.moduleRunner.getInstance(module);
    }

    const loaderModule = t.moduleRunner.getInstance(LoaderModule);

    await loaderModule.load();
    await db.dbModule.init();

    const session = await db.data.getSource(RequestSession).insert({
      token: "test",
      timeout: getCurrentTime() + SESSION_TIMEOUT,
    });

    t.provide(DataRow(RequestSession).provide(() => session));

    return {
      rtModule,
      db,
      rpc,
      loaderModule,

      configure: (config: Omit<RichTextConfig, "context">): RichTextConfig => {
        const context = t.resolve(RichTextContext);
        const configWithContext = { ...config, context };
        t.provide(RichTextConfigResolver.provide(() => configWithContext));
        return configWithContext;
      },
    };
  });
}
