import { Awaitable } from "@dabsi/common/typings2/Async";
import { DataRowTicker } from "@dabsi/modules/data/rowTicker";
import LoaderModule from "@dabsi/modules/LoaderModule";
import { RpcModuleTester } from "@dabsi/modules/rpc/tests/RpcModuleTester";
import { RequestSession, SESSION_TIMEOUT } from "@dabsi/modules/session";
import { Session } from "@dabsi/modules/session/entities/Session";
import getCurrentTime from "@dabsi/modules/session/getCurrentTime";
import DbModuleTester from "@dabsi/modules/tests/DbModuleTester";
import RichTextModule from "@dabsi/system/rich-text";
import { RichTextBlock } from "@dabsi/system/rich-text/common/block";
import { RichTextContent } from "@dabsi/system/rich-text/common/content";
import { RichTextEntity } from "@dabsi/system/rich-text/common/entity";
import { RichTextConfig } from "@dabsi/system/rich-text/common/types";
import { RichTextConfigContext } from "@dabsi/system/rich-text/configContext";
import { RichTextContext } from "@dabsi/system/rich-text/context";
import ModuleTester from "@dabsi/system/rich-text/tests/ModuleTester";
import { TestStorage } from "@dabsi/system/rich-text/tests/TestStorage";
import { makeContentWithEntity } from "@dabsi/system/rich-text/tests/utils";
import Storage from "@dabsi/system/storage/Storage";
import { Resolver } from "@dabsi/typedi";
import { ModuleTarget } from "@dabsi/typedi/OldModuleMetadata2";

const t = ModuleTester();
const db = DbModuleTester(t);
const rpc = RpcModuleTester(t);

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

    t.provide(Resolver(Storage, () => new TestStorage()));

    for (const module of rtTestModules) {
      t.moduleRunner.getInstance(module);
    }

    for (const callback of rtTestBeforeInit) {
      await callback();
    }
    await t.loaderModule.load();
    await db.dbModule.init();

    const session = await db.data.getSource(Session).insert({
      token: "test",
      timeout: getCurrentTime() + SESSION_TIMEOUT,
    });

    const sessionTicker = new DataRowTicker(
      db.data,
      Session,
      session.$key,
      callback => callback()
    );

    t.provide(Resolver(RequestSession, () => sessionTicker));
    let rtConfig: RichTextConfig;

    const testContent = async (content: RichTextContent.Unpacked) => {
      const docKey = await rtConfig.context.pack(rtConfig, content);
      const doc = await rtConfig.context.docs.getOrFail(docKey);
      const packedContent = JSON.parse(doc.content) as RichTextContent.Packed;
      return {
        packedContent,
        unpackedContent: await rtConfig.context.unpack(rtConfig, docKey, false),
        readonlyContent: await rtConfig.context.unpack(rtConfig, docKey, true),
      };
    };

    return {
      rtModule,
      testContent,
      pack(content: RichTextContent.Unpacked, docKey?: string) {
        return rtConfig.context.pack(rtConfig, content, docKey);
      },

      unpack(docKey: string, forReadonly: boolean) {
        return rtConfig.context.unpack(rtConfig, docKey, forReadonly);
      },

      configure: (config: Omit<RichTextConfig, "context">): RichTextConfig => {
        const context = t.resolve(RichTextContext);
        rtConfig = { ...config, context };
        t.provide(Resolver(RichTextConfigContext, () => rtConfig));
        return rtConfig;
      },

      async testBlock<T extends RichTextBlock.Type>(
        type: T,
        data: RichTextBlock.UnpackedData<T>,
        {
          entityRanges = [],
          styleRanges = [],
          styleMap = {},
          depth = 0,
        }: Partial<
          Omit<RichTextBlock.Unpacked<T>, "type" | "data" | "key">
        > = {}
      ) {
        const {
          packedContent: {
            blocks: [{ data: packedData }],
          },
          unpackedContent: {
            blocks: [{ data: unpackedData }],
          },
          readonlyContent: {
            blocks: [{ data: readonlyData }],
          },
        } = await testContent({
          blocks: [
            {
              type,
              text: " ",
              data,
              key: "b1",
              entityRanges,
              styleRanges,
              depth: 0,
              styleMap,
            },
          ],
          entityMap: {},
        });
        return { unpackedData, packedData, readonlyData };
      },
      async testEntity(entity: RichTextEntity.Unpacked) {
        const {
          packedContent: {
            entityMap: {
              0: { data: packedData, type },
            },
          },
          unpackedContent: {
            entityMap: {
              0: { data: unpackedData },
            },
          },
          readonlyContent: {
            entityMap: {
              0: { data: readonlyData },
            },
          },
        } = await testContent(makeContentWithEntity(entity));

        return { unpackedData, packedData, readonlyData };
      },
    };
  });
