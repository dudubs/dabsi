import { DataContext } from "@dabsi/modules/data/context";
import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
import RequestSession from "@dabsi/modules/session/RequestSession";
import { RichTextImageRpc } from "@dabsi/system/rich-text-plugins/image/common/rpc";
import { RichTextConfigResolver } from "@dabsi/system/rich-text/configResolver";
import { ImageFile } from "@dabsi/system/storage/entities/image";
import StorageManager from "@dabsi/system/storage/StorageManager";
import { DataRow } from "@dabsi/typedata/row";
import { RpcError } from "@dabsi/typerpc/Rpc";
import sharp from "sharp";

export default RpcConfigResolver(
  RichTextImageRpc,
  {
    config: RichTextConfigResolver,
    storageManager: StorageManager,
    rpcReq: RpcRequest,
    data: DataContext,
    session: DataRow(RequestSession),
  },
  c => $ =>
    $({
      async upload({ field }) {
        if (!c.config.allowAll && !c.config.image)
          throw new RpcError("Not allowed.");
        const buffer = c.rpcReq.body[field];
        const { key, url } = await c.storageManager.upload(
          "rt-image", // rich-text-image
          "png",
          await sharp(buffer).png().toBuffer(),
          ImageFile,
          {
            imageWidth: 100,
            imageHeight: 100,
          }
        );
        return { key, url };
      },
    })
);
