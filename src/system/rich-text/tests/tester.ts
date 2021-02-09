import { Awaitable } from "@dabsi/common/typings2/Async";
import LoaderModule from "@dabsi/modules/LoaderModule";
import { RpcTester } from "@dabsi/modules/rpc/tests/tester";
import { SESSION_TIMEOUT } from "@dabsi/modules/session";
import getCurrentTime from "@dabsi/modules/session/getCurrentTime";
import RequestSession from "@dabsi/modules/session/RequestSession";
import DbTester from "@dabsi/modules/tests/DbTester";
import RichTextModule from "@dabsi/system/rich-text";
import { RichTextContent } from "@dabsi/system/rich-text/common/content";
import { RichTextEntity } from "@dabsi/system/rich-text/common/contentEntity";
import { RichTextConfig } from "@dabsi/system/rich-text/common/types";
import { RichTextConfigResolver } from "@dabsi/system/rich-text/configResolver";
import { RichTextContext } from "@dabsi/system/rich-text/context";
import ModuleTester from "@dabsi/system/rich-text/tests/ModuleTester";
import { TestStorage } from "@dabsi/system/rich-text/tests/TestStorage";
import { makeContentWithEntity } from "@dabsi/system/rich-text/tests/utils";
import Storage from "@dabsi/system/storage/Storage";
import { DataRow } from "@dabsi/typedata/row";
import { ModuleTarget } from "@dabsi/typedi";

const t = ModuleTester();
const db = DbTester(t);
const rpc = RpcTester(t);

export const rtTestModules = [] as ModuleTarget[];
export const rtTestBeforeInit = [] as (() => Awaitable)[];

export const rtTester = t
  .beforeAll(t => ({
    rpc,
    db,
    loaderModule: t.moduleRunner.getInstance(LoaderModule),
  }))
  .beforeAll(async t => {
    const rtModule = await t.moduleRunner.getInstance(RichTextModule);

    t.provide(Storage.provide(() => new TestStorage()));

    for (const module of rtTestModules) {
      t.moduleRunner.getInstance(module);
    }

    for (const callback of rtTestBeforeInit) {
      await callback();
    }
    await t.loaderModule.load();
    await db.dbModule.init();

    const session = await db.data.getSource(RequestSession).insert({
      token: "test",
      timeout: getCurrentTime() + SESSION_TIMEOUT,
    });

    t.provide(DataRow(RequestSession).provide(() => session));

    let rtConfig: RichTextConfig;

    return {
      rtModule,

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

      async testEntity(entity: RichTextEntity.Unpacked) {
        const docKey = await rtConfig.context.pack(
          rtConfig,
          makeContentWithEntity(entity)
        );
        const {
          entityMap: {
            0: { data: packedData, type },
          },
        } = <RichTextContent.Packed>(
          JSON.parse(
            await rtConfig.context.docs
              .getOrFail(docKey)
              .then(doc => doc.content)
          )
        );

        const {
          entityMap: {
            0: { data: unpackedData },
          },
        } = await rtConfig.context.unpack(rtConfig, docKey, false);

        const {
          entityMap: {
            0: { data: readonlyData },
          },
        } = await rtConfig.context.unpack(rtConfig, docKey, true);
        return { unpackedData, packedData, readonlyData, docKey };
      },
    };
  });
