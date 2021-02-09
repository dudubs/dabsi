import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
import RichTextImageModule from "@dabsi/system/rich-text-plugins/image";
import { RichTextImageRpc } from "@dabsi/system/rich-text-plugins/image/common/rpc";
import { rtTester, rtTestModules } from "@dabsi/system/rich-text/tests/tester";
import sharp from "sharp";

rtTestModules.push(RichTextImageModule);

const t = rtTester.beforeAll(async t => {
  t.configure({ allowAll: true });

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

  const image = await rpcConn.upload({ field: "testField" });

  return {
    entity: await t.testEntity({
      type: "image",
      data: {
        imageKey: image.key,
        url: image.url,
      },
    }),
  };
});

it("expect to packed data", () => {
  expect(t.entity.packedData).toEqual(
    jasmine.objectContaining({ imageKey: jasmine.any(String) })
  );
});

it("expect to unpacked data", () => {
  expect(t.entity.unpackedData).toEqual({
    url: jasmine.any(String),
    imageKey: jasmine.any(String),
  });
});
it("expect to readonly data", () => {
  expect(t.entity.readonlyData).toEqual(<any>{ url: jasmine.any(String) });
});
