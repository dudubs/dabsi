import { Awaitable } from "@dabsi/common/typings2/Async";
import { DataRowTicker } from "@dabsi/modules/data/rowTicker";
import LoaderModule from "@dabsi/modules/LoaderModule";

import { RequestSession, SESSION_TIMEOUT } from "@dabsi/modules/session/module";
import { Session } from "@dabsi/modules/session/entities/Session";
import getCurrentTime from "@dabsi/modules/session/getCurrentTime";

import RichTextModule from "@dabsi/system/rich-text";
import { RichTextBlock } from "@dabsi/system/rich-text/common/block";
import { RichTextContent } from "@dabsi/system/rich-text/common/content";
import { RichTextEntity } from "@dabsi/system/rich-text/common/entity";
import { RichTextConfig } from "@dabsi/system/rich-text/common/types";
import { RichTextConfigContext } from "@dabsi/system/rich-text/configContext";
import { RichTextContext } from "@dabsi/system/rich-text/context";

import { TestStorage } from "@dabsi/system/rich-text/tests/TestStorage";
import { makeContentWithEntity } from "@dabsi/system/rich-text/tests/makeContentWithEntity";

import { Resolver } from "@dabsi/typedi";
import { ModuleTester } from "@dabsi/typemodule/tests/ModuleTester";
import { DbModuleTester } from "@dabsi/modules2/tests/DbModuleTester";
import { RpcModuleTester } from "@dabsi/modules2/tests/RpcModuleTester";
import { Storage } from "@dabsi/system/storage/Storage";
import { Tester } from "@dabsi/jasmine/Tester";

const mt = ModuleTester();
const dbt = DbModuleTester(mt);
const rpct = RpcModuleTester(mt);

export const rtTestBuilders: Resolver<void>[] = [];

export const rtTestBeforeInit = [] as (() => Awaitable)[];

export const rtTester = Tester.beforeAll(t => ({
  mt,
  rpct,
  dbt,
})).beforeAll(async t => {
  const rtModule = await mt.getAndWait(RichTextModule);

  mt.provide(Resolver(Storage, () => new TestStorage()));

  for (const builder of rtTestBuilders) {
    await mt.resolve(builder);
  }

  for (const callback of rtTestBeforeInit) {
    await callback();
  }

  await dbt.wait();

  const session = await dbt.getDataSource(Session).insert({
    token: "test",
    timeout: getCurrentTime() + SESSION_TIMEOUT,
  });

  const sessionTicker = new DataRowTicker(
    dbt.getDataSource,
    Session,
    session.$key,
    callback => callback()
  );

  mt.provide(Resolver(RequestSession, () => sessionTicker));

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
      const context = mt.resolve(RichTextContext);
      rtConfig = { ...config, context };
      mt.provide(Resolver(RichTextConfigContext, () => rtConfig));
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
      }: Partial<Omit<RichTextBlock.Unpacked<T>, "type" | "data" | "key">> = {}
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
