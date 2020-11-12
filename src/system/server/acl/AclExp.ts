import { Union } from "../../../common/typings";
import { GetBaseType } from "../../../typedata/BaseType";
import { DataExp } from "../../../typedata/data-exp/DataExp";
import { BasedDataRow } from "../../../typedata/DataSourceRow";
import { AclCriterion, AclRow, AclRowType } from "./AclCriterion";
import { User } from "./User";
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
