import { Permission } from "@dabsi/system-old/server/acl/Permission";
import { DataExp } from "@dabsi/typedata/data-exp/DataExp";
import { isPermissionOfUserExp } from "@dabsi/system/admin/server/isPermissionOfUserExp";

export function hasPermissionForUserExp(
  userKey: string,
  tokens: string[]
): DataExp<Permission> {
  return {
    $and: [isPermissionOfUserExp(userKey), { token: { $in: tokens } }],
  };
}
