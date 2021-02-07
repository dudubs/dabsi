import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
import RichTextImageModule from "@dabsi/system/rich-text-plugins/image";
import RichTextImageRpc from "@dabsi/system/rich-text-plugins/image/common/RichTextImageRpc";
import {
  rtTester as t,
  rtTestModules,
} from "@dabsi/system/rich-text/tests/tester";
import { makeContentWithEntity } from "@dabsi/system/rich-text/tests/utils";
import sharp from "sharp";

rtTestModules.push(RichTextImageModule);

fit("", async () => {
  const rtConfig = t.configure({ allowAll: true });

  const rpcConn = t.rpc.createConnection(RichTextImageRpc);

  t.rpc.request.current = new RpcRequest(
    [],
    {},
    {
      testField: await sharp({
        create: { width: 20, height: 20, channels: 4, background: "#FFF" },
      })
        .png()
        .toBuffer(),
    }
  );

  const data = await rpcConn.upload({ field: "testField" });

  const docKey = await rtConfig.context.pack(
    rtConfig,
    makeContentWithEntity({
      type: "image",
      mutability: "IMMUTABLE",
      data: {
        key: data.key,
        url: data.url,
      },
    })
  );

  console.log(
    JSON.stringify(
      await rtConfig.context.unpack(rtConfig, docKey, false),
      null,
      2
    )
  );
});
