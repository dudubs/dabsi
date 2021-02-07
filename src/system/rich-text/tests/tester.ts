import LoaderModule from "@dabsi/modules/LoaderModule";
import { RpcTester } from "@dabsi/modules/rpc/tests/tester";
import { SESSION_TIMEOUT } from "@dabsi/modules/session";
import getCurrentTime from "@dabsi/modules/session/getCurrentTime";
import RequestSession from "@dabsi/modules/session/RequestSession";
import DbTester from "@dabsi/modules/tests/DbTester";
import RichTextModule from "@dabsi/system/rich-text";
import { RichTextConfig } from "@dabsi/system/rich-text/common/types";
import { RichTextConfigResolver } from "@dabsi/system/rich-text/configResolver";
import { RichTextContent } from "@dabsi/system/rich-text/content";
import { RichTextContext } from "@dabsi/system/rich-text/context";
import ModuleTester from "@dabsi/system/rich-text/tests/ModuleTester";
import { TestStorage } from "@dabsi/system/rich-text/tests/TestStorage";
import Storage from "@dabsi/system/storage/Storage";
import { DataRow } from "@dabsi/typedata/row";
import { ModuleTarget } from "@dabsi/typedi";

const t = ModuleTester();
const db = DbTester(t);
const rpc = RpcTester(t);

export const rtTestModules = [] as ModuleTarget[];

export const rtTester = t.beforeAll(async t => {
  const rtModule = await t.moduleRunner.getInstance(RichTextModule);

  t.provide(Storage.provide(() => new TestStorage()));

  for (const module of rtTestModules) {
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

  let rtConfig: RichTextConfig;

  return {
    rtModule,
    db,
    rpc,
    loaderModule,

    pack(content: RichTextContent.Unpacked, docKey?: string) {
      return rtConfig.context.pack(rtConfig, content, docKey);
    },

    unpack(docKey: string, forReadonly: boolean) {
      return rtConfig.context.unpack(rtConfig, docKey, forReadonly);
    },

    configure: (config: Omit<RichTextConfig, "context">): RichTextConfig => {
      const context = t.resolve(RichTextContext);
      rtConfig = { ...config, context };
      t.provide(RichTextConfigResolver.provide(() => rtConfig));
      return rtConfig;
    },
  };
});
