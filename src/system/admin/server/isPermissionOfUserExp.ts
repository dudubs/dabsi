import { Permission } from "../../../system-old/server/acl/Permission";
import { DataExp } from "../../../typedata/data-exp/DataExp";

export function isPermissionOfUserExp(userKey: string): DataExp<Permission> {
  const userExp = { $is: userKey };
  return {
    $or: [
      { $at: { user: userExp } }, //
      {
        $at: {
          group: {
            $has: { users: userExp },
          },
        },
      },
    ],
  };
}
