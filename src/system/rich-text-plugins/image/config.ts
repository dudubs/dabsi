import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
import { DataSourceFactory2 } from "@dabsi/modules2/DataSourceFactory2";
import { RichTextImageRpc } from "@dabsi/system/rich-text-plugins/image/common/rpc";
import { RichTextPlugin } from "@dabsi/system/rich-text/common/plugin";
import { RichTextConfigContext } from "@dabsi/system/rich-text/configContext";
import { StorageImage } from "@dabsi/system/storage/entities/StorageImage";
import StorageManager from "@dabsi/system/storage/StorageManager";
import { RpcError } from "@dabsi/typerpc/RpcError";
import sharp from "sharp";

export default RpcConfigResolver(
  RichTextImageRpc,
  {
    config: RichTextConfigContext,

    storageManager: StorageManager,
    rpcReq: RpcRequest,
    getDataSource: DataSourceFactory2,
  },
  c => $ =>
    $({
      async upload({ field }) {
        const { min, max } = RichTextPlugin.assertConfig(c.config, "image");
        const buffer = c.rpcReq.body[field];
        const metadata = await sharp(buffer).metadata();
        if (!metadata.width || !metadata.height)
          throw new RpcError("Invalid image metadata");

        if (max) {
        }

        if (min) {
          for (const dim of ["width", "height"] as const) {
            if (min[dim] && min[dim]! > metadata[dim]!) {
              throw new RpcError(`Expect to minimum ${dim} of ${min[dim]}px.`);
            }
          }
        }

        const { key, url } = await c.storageManager.upload(
          "rt-image", // rich-text-image
          "png",
          await sharp(buffer).png().toBuffer(),
          StorageImage,
          {
            imageWidth: 100,
            imageHeight: 100,
          }
        );
        return { key, url };
      },
    })
);
