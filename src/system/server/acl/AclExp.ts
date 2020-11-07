import { Union } from "../../../common/typings";
import { GetBaseType } from "../../../typedata/BaseType";
import { BasedDataRow } from "../../../typedata/DataSourceRow";
import { AclCriterion } from "./AclCriterion";
export type AclCriterionExp = (
  callback: <T extends BasedDataRow<any>>(
    dataRow: T
  ) => AclCriterion<GetBaseType<T>>
) => AclCriterion<any>;

export interface AclExpMap {
  $all: AclExp[];
  $any: AclExp[];
  $not: AclExp;
  $privilege: {
    allow?: AclExp[];
    deny?: AclExp[];
  };
}

export type AclExp =
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
