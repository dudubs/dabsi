import { Group } from "./acl/Group";
import { GroupPermission, Permission, UserPermission } from "./acl/Permission";
import { Session } from "./acl/Session";
import { User } from "./acl/User";

export const SystemEntities = [
  User,
  Group,
  Session,
  //
  Permission,
  UserPermission,
  GroupPermission,
];
