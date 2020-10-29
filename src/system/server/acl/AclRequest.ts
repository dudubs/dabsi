import { Connection } from "typeorm";
import { entries } from "../../../common/object/entries";
import { hasKeys } from "../../../common/object/hasKeys";
import { ExtractKeys, Type } from "../../../common/typings";
import { BasedType } from "../../../typedata/BaseType";
import { DataExp } from "../../../typedata/DataExp";
import { DataRow } from "../../../typedata/DataRow";
import { DataSource } from "../../../typedata/DataSource";
import { GetDataSource } from "../../../typedata/DataSource/DataSource";
import { EntityDataSource } from "../../../typedata/eds/EntityDataSource";
import {
  Relation,
  RelationKeys,
  RelationToOneOrMany,
} from "../../../typedata/Relation";
import { Consumer } from "../../../typedi/Consumer";
import { RpcRequest } from "../../../typerpc/RpcRequest";
import { Group } from "./Group";
import { Owner, OwnerData } from "./Owner";
import { User } from "./User";

/*

const forumReq = aclReq.categoryMap({

  MAKE_POST: req=> req.allow(
    ({user}, ds) => ds(Forum).filter({ $has:{members: user} })
  )

});
const aclReqMap = aclReq.createTokenMap({
  CAN_WRITE_POST:  (({user}, ds)=> ds().filter({ $has: {members} })),
  BLOCKED_BY_OWNER: (({user}, ds)=> ds().filter({ $has: {members} })),
})

createAclTokens({


})


// DataAccess
aclReq.allow()
.den

aclReqMap
  .allow("CAN_WRITE_POST")
  .deny("BLOCKED_BY_OWNER")

access: RpcAccessToken()


forumReq


RpcMap({

  access: RpcAccess("MAKE_POST", ""....),

  makePost: RpcFn()

})


const makePostReq = forumReq.category("MAKE_POST")






 */

type AclExps = {
  readonly user: DataExp<BasedType<User>>;
  readonly group: DataExp<BasedType<Group>>;
};

export class AclRequestTokens<K extends string> {
  constructor(
    public req: AclRequest,
    public tokenMap: Record<string, (exp: AclExps, gds: GetDataSource) => any>
  ) {}

  allow(key: K) {
    return this;
  }

  deny(key: K) {
    return this;
  }

  async assert() {}
}
type AclRequestCallback = (
  exps: AclExps,
  getDs: GetDataSource
) => DataSource<any>;
export class AclRequest {
  getDataSource: GetDataSource = type =>
    EntityDataSource.create(type, this.getConnection);

  constructor(public getConnection: () => Connection) {}

  protected callbacks: {
    type: "allow" | "deny";
    callback: AclRequestCallback;
  }[] = [];

  protected denyCallbacks: AclRequestCallback[] = [];
  protected allowCallbacks: AclRequestCallback[] = [];

  createTokens<K extends string>(
    tokenMap: Record<
      K,
      {
        (exps: AclExps, getDs: GetDataSource): DataSource<any>;
      }
    >
  ): AclRequestTokens<K> {
    return new AclRequestTokens(this, tokenMap);
  }

  allow(callback: AclRequestCallback) {
    this.allowCallbacks.push(callback);
    return this;
  }

  deny(callback: AclRequestCallback) {
    this.denyCallbacks.push(callback);
    return this;
  }

  async ask(userId: string) {
    let allQuery = "1";
    let allParams: any[] = [];

    const { getDataSource } = this;

    function buildQuery(callback: AclRequestCallback[], isDeny = false) {
      let allQuery = `SELECT 1 v`;
      for (const buildDS of callback) {
        const ds = buildDS(
          {
            user: { $is: userId },
            group: { $has: { user: { $is: userId } } },
          },
          getDataSource
        )
          .take(1)
          .pick([], {});

        if (!(ds instanceof EntityDataSource)) {
          throw new Error();
        }
        let [
          query,
          params,
        ] = ds.createEntityLoader().qb.getQueryAndParameters();

        allParams.push(...params);

        const hasRows = `(SELECT COUNT(*) cx FROM (${query}) x LIMIT 1)`;

        allQuery = `${allQuery} UNION SELECT ${hasRows} v`;
      }
      return allQuery;
    }

    const isAllowedQuery = buildQuery(this.allowCallbacks, false);
    const isDeniedQuery = buildQuery(this.denyCallbacks, true);
    allQuery = `SELECT (${isAllowedQuery}) AND NOT (${isDeniedQuery}) isAllowed`;

    console.log({ allQuery });

    const [{ isAllowed }] = await this.getConnection().query(
      allQuery,
      allParams
    );

    return Boolean(isAllowed);
  }
}
