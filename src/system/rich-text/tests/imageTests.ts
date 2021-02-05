import { WeakId } from "@dabsi/common/WeakId";
import LoaderModule from "@dabsi/modules/LoaderModule";
import RpcModule from "@dabsi/modules/rpc";
import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
import RichTextImageModule from "@dabsi/system/rich-text-plugins/image";
import RichTextImageRpc from "@dabsi/system/rich-text-plugins/image/common/RichTextImageRpc";
import { RichTextImageEntity } from "@dabsi/system/rich-text-plugins/image/entities/ImageEntity";
import { RichTextRpc } from "@dabsi/system/rich-text/common/rpc";
import { RichTextConfig } from "@dabsi/system/rich-text/common/types";
import { RichTextConfigResolver } from "@dabsi/system/rich-text/configResolver";
import { RichTextContext } from "@dabsi/system/rich-text/context";
import { RichTextEntity } from "@dabsi/system/rich-text/entities/DocumentEntity";
import RichTextTester from "@dabsi/system/rich-text/tests/RichTextTester";
import { TestStorage } from "@dabsi/system/rich-text/tests/TestStorage";
import Storage from "@dabsi/system/storage/Storage";
import { DataUnion } from "@dabsi/typedata/union";
import { Resolver } from "@dabsi/typedi";
import sharp from "sharp";
const t = RichTextTester(async ({ moduleRunner }) => {
  moduleRunner.getInstance(RichTextImageModule);
});
fit("", async () => {
  //   log.enable("TRACE");
  const rpcModule = t.moduleRunner.getInstance(RpcModule);

  await t.moduleRunner.getInstance(LoaderModule).load();

  let rpcRequestBody: any = {};

  const context = Resolver.createContext(
    t.moduleRunner.context,
    RpcRequest.provide(() => {
      return new RpcRequest([], {}, rpcRequestBody);
    }),
    Storage.provide(() => new TestStorage()),
    RichTextConfigResolver.provide(() => {
      return rtConfig;
    })
  );

  const rtContext = Resolver.resolve(RichTextContext, context);
  const rtConfig: RichTextConfig = {
    context: rtContext,
    editable: true,
    allowAll: true,
  };

  const rpcConn = rpcModule.createRpcConnection(RichTextImageRpc, context);

  rpcRequestBody = {
    testField: await sharp({
      create: { width: 20, height: 20, channels: 4, background: "#FFF" },
    })
      .png()
      .toBuffer(),
  };

  const imageUnpackedData = await rpcConn.upload({ field: "testField" });

  const docKey = await rtContext.insert(rtConfig, {
    blocks: [
      {
        text: " ",
        key: "1x",
        type: "unstyled",
        depth: 0,
        entityRanges: [{ key: 0, offset: 0, length: 1 }],
        inlineStyleRanges: [],
      },
    ],
    entityMap: {
      0: { type: "image", mutability: "IMMUTABLE", data: imageUnpackedData },
    },
  });

  // console.log(await t.data.getSource(RichTextEntity).getRows());

  console.log(await rtContext.unpack(rtConfig, docKey, false));

  //   console.log(await rtContext.unpack(rtConfig, docKey, false));
});
