import { SESSION_TIMEOUT } from "@dabsi/modules/session";
import getCurrentTime from "@dabsi/modules/session/getCurrentTime";
import RequestSession from "@dabsi/modules/session/RequestSession";
import RichTextModule from "@dabsi/system/rich-text";
import { RichTextContext } from "@dabsi/system/rich-text/context";
import { RichTextDocument } from "@dabsi/system/rich-text/entities/Document";
import ModuleTester from "@dabsi/system/rich-text/tests/ModuleTester";
import {
  RTTestEntity1,
  RTTestEntity1Type,
} from "@dabsi/system/rich-text/tests/RTTestEntity1";
import { DataRow } from "@dabsi/typedata/row";
import { Resolver } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";

export default (
  callback: (_: {
    richTextModule: RichTextModule;
    moduleRunner: ModuleRunner;
  }) => void
) =>
  ModuleTester({ entityTypes: [RichTextDocument] }).beforeAll(async t => {
    const richTextModule = await t.moduleRunner.getInstance(RichTextModule);

    richTextModule.install(i => {
      i.defineEntity(RTTestEntity1Type, {
        entityType: RTTestEntity1,
        mutability: {
          MUTABLE: true,
        },
        unpackSelection: { pick: ["testText"] },
        packEntityKey: data => data.testKey,
        unpack: (_, row, data) => ({
          testKey: row.$key,
          entityText: row.testText,
          dataText: data,
        }),
        pack: (_, row, data) => data.dataText,
        unpackForReadonly: (_, row, data) => ({
          entityText: row.testText,
          dataText: data,
        }),
      });
    });
    callback({ richTextModule, moduleRunner: t.moduleRunner });

    await richTextModule.init();

    const session = await t.data.getSource(RequestSession).insert({
      token: "test",
      timeout: getCurrentTime() + SESSION_TIMEOUT,
    });
    Resolver.provide(
      t.moduleRunner.context,
      DataRow(RequestSession).provide(() => session)
    );
    return { richTextModule };
  });
