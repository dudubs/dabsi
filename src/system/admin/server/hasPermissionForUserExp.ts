import { Permission } from "../../../system-old/server/acl/Permission";
import { DataExp } from "../../../typedata/data-exp/DataExp";
import { isPermissionOfUserExp } from "./isPermissionOfUserExp";

export function hasPermissionForUserExp(
  userKey: string,
  tokens: string[]
): DataExp<Permission> {
  return {
    $and: [isPermissionOfUserExp(userKey), { token: { $in: tokens } }],
  };
}
