import sharp from "sharp";
import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
import AclAdminUserAvatarModule from "@dabsi/system/acl-user-avatar";
import AclEditUserAvatarRpc from "@dabsi/system/acl-user-avatar/common/AclEditUserAvatarRpc";
import { User } from "@dabsi/system/acl/entities/User";
import StorageManager from "@dabsi/system/storage/StorageManager";
import { DataRow } from "@dabsi/typedata/row";
import { RpcError } from "@dabsi/typerpc/RpcError";

export default RpcConfigResolver(
  AclEditUserAvatarRpc,
  {
    user: DataRow(User),
    rpcReq: RpcRequest,
    storageManager: StorageManager,
    module: AclAdminUserAvatarModule,
  },
  c => $ =>
    $({
      controllerConfig: {
        async update({ field }) {
          // todo: check size
          const buffer = c.rpcReq.body[field];

          if (!Buffer.isBuffer(buffer))
            throw new TypeError(`Expected to buffer`);

          // shrap(buffer).stats().then(x=>x.)
          const metadata = await sharp(buffer).metadata();

          if (metadata.width !== metadata.height) {
            throw new RpcError(`Expected width = height.`);
          }

          if (metadata.width! < c.module.avatarMinSize)
            throw new RpcError(
              `Expected to minSize ${c.module.avatarMinSize}px`
            );

          if (metadata.width! > c.module.avatarMaxSize)
            throw new RpcError(
              `Expected to maxSize ${c.module.avatarMaxSize}px`
            );

          const file = await c.storageManager.upload(
            "user-avatar",
            "png",
            await sharp(buffer).png().toBuffer()
          );

          await c.user.update({ avatar: file.key });

          return { url: file.url };
        },
      },
      getElement() {
        return {
          currentUrl: c.user.avatar?.url,
          maxSize: c.module.avatarMaxSize,
          minSize: c.module.avatarMinSize,
        };
      },
    })
);

// browser/tests
