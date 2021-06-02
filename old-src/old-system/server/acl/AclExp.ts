import { Union } from "@dabsi/common/typings2/Union";
import { RebaseType } from "@dabsi/typedata/BaseType";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { BasedDataRow } from "@dabsi/typedata/sourceRow";
import {
  AclCriterion,
  AclRow,
  AclRowType,
} from "@dabsi/old-system/server/acl/AclCriterion";
import { User } from "@dabsi/system/acl/entities/User";
export type AclCriterionExp = (
  callback: <T extends AclRow<any>>(dataRow: T) => AclCriterion<AclRowType<T>>
) => AclCriterion<any>;

export interface AclExpMap {
  $all: AclExp[];
  $any: AclExp[];
  $not: AclExp;
  $privilege: {
    allow?: AclExp[];
    deny?: AclExp[];
  };
  $user: DataExp<User>;
}

export type AclExp =
  | true
  | false
  | undefined
  | AclCriterionExp
  | string
  | Union<
      {
        [K in keyof AclExpMap]: {
          [_ in K]: AclExpMap[K];
        };
      }
    >;

export function AclExp(...exps: AclExp[]): AclExp {
  if (exps.length === 1) {
    return exps[0];
  }
  return { $all: exps };
}

// acReq.allow({$permission: "ADMIN"}).deny(p => p(..)....)
