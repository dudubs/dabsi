import { Permission } from "@dabsi/old-system/server/uac/Permission";
import { DataExp } from "@dabsi/typedata/exp/exp";

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
