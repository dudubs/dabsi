import { Permission } from "@dabsi/old-system/server/acl/Permission";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { isPermissionOfUserExp } from "@dabsi/system/admin/server/isPermissionOfUserExp";

export function hasPermissionForUserExp(
  userKey: string,
  tokens: string[]
): DataExp<Permission> {
  return {
    $and: [isPermissionOfUserExp(userKey), { token: { $in: tokens } }],
  };
}
