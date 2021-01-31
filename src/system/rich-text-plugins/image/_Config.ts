import { DataContext } from "@dabsi/modules/data/context";
import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
import RequestSession from "@dabsi/modules/session/RequestSession";
import RichTextImageRpc from "@dabsi/system/rich-text-plugins/image/common/RichTextImageRpc";
import { RichTextImageEntity } from "@dabsi/system/rich-text-plugins/image/entities/ImageEntity";
import RichTextConfigResolver from "@dabsi/system/rich-text/configResolver";
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
        if (!c.config.editable) throw new RpcError("Not editable.");
        if (!c.config.allowAll && !c.config.image)
          throw new RpcError("Not allowed.");
        const buffer = c.rpcReq.body[field];
        const file = await c.storageManager.upload(
          "rt-image", // rich-text-image
          "png",
          await sharp(buffer).png().toBuffer()
        );
        const key = await c.data.getSource(RichTextImageEntity).insertKey({
          file,
          session: c.session,
          width: 100,
          height: 100,
        });
        return { url: file.url, key };
      },
    })
);
