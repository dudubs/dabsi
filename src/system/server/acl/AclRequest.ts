import { Connection } from "typeorm";
import { ExtractKeys, Type } from "../../../common/typings";
import { BasedType } from "../../../typedata/BaseType";
import { DataExp } from "../../../typedata/data-exp/DataExp";
import { EntityDataQueryExpToSqlTranslator } from "../../../typedata/data-query/EntityDataQueryExpToSqlTranslator";
import { DataSource, GetDataSource } from "../../../typedata/DataSource";
import { EntityDataCursor } from "../../../typedata/entity-data/EntityDataCursor";
import { EntityDataExpTranslator } from "../../../typedata/entity-data/EntityDataExpTranslator";
import { EntityDataLoader } from "../../../typedata/entity-data/EntityDataLoader";
import { EntityDataSource } from "../../../typedata/entity-data/EntityDataSource";
import { Relation } from "../../../typedata/Relation";
import { Group } from "./Group";
import { User } from "./User";

declare const _Exp: unique symbol;
type _WithFor<T> = {
  for: [Type<T>, string];
};

type _ForOptions<T> = {
  byFilter?(exps: {
    user: DataExp<BasedType<User>>;
    group: DataExp<BasedType<Group>>;
  }): DataExp<T>;

  isUser?: ExtractKeys<T, Relation<BasedType<User>>>;
  hasUser?: ExtractKeys<T, Relation<BasedType<User>>[]>;

  isGroup?: ExtractKeys<T, Relation<BasedType<Group>>>;
  hasGroup?: ExtractKeys<T, Relation<BasedType<Group>>[]>;
};
type _WithBySource<T, U> = _WithFor<T> & {
  bySource(source: DataSource<T>): DataSource<U>;
} & _ForOptions<U>;

type _WithoutBySource<T> = _WithFor<T> & {
  bySource?: never;
} & _ForOptions<T>;

export type AclCriterionOptionsTypes<T, U> = {
  WithFor: {
    for: [Type<T>, string];
  };

  ForOptions: {
    byFilter?(exps: {
      user: DataExp<BasedType<User>>;
      group: DataExp<BasedType<Group>>;
    }): DataExp<T>;

    byUser?: ExtractKeys<
      T,
      Relation<BasedType<User>> | Relation<BasedType<User>>[]
    >;

    byGroup?: ExtractKeys<
      T,
      Relation<BasedType<Group>> | Relation<BasedType<Group>>[]
    >;
  };

  WithBySource: AclCriterionOptionsTypes<T, U>["WithFor"] & {
    bySource(source: DataSource<T>): DataSource<U>;
  } & AclCriterionOptionsTypes<T, U>["ForOptions"];

  WithoutBySource: AclCriterionOptionsTypes<T, U>["WithFor"] & {
    bySource?: never;
  } & AclCriterionOptionsTypes<T, U>["ForOptions"];
};

export type AnyAclCriterionOptions = AclCriterionOptions<any, any>;

export type AclCriterionOptions<T, U> =
  | _WithBySource<T, U>
  | _WithoutBySource<T>;

export class AclCriterion {
  static create<T, U = T>(
    connection: Connection,
    options: AclCriterionOptions<T, U>
  ) {
    return new AclCriterion(connection, options as AnyAclCriterionOptions);
  }
  constructor(
    public connection: Connection,
    public options: AnyAclCriterionOptions
  ) {}

  ask(userKey: string): Promise<boolean> {
    const [sql, params] = this.getQueryAndParameters(userKey);
    return this.connection
      .query(`SELECT (${sql}) cx`, params)
      .then(rows => !!rows[0]?.cx);
  }

  getQueryAndParameters(
    userKey: string,
    parameters: any[] = []
  ): [string, any[]] {
    const allSql: string[] = [];
    if (this.options.for) {
      const [entityType, entityKey] = this.options.for;

      let source: DataSource<any> = EntityDataSource.create(
        entityType,
        () => this.connection
      ).filter({ $is: entityKey });

      if (this.options.bySource)
        source = this.options.bySource(source as DataSource<any>);

      const user = { $is: userKey };
      const group: DataExp<Group> = { $has: { users: user } };

      source = source.asMutable();

      if (this.options.byFilter)
        source = source.filter(
          this.options.byFilter({
            user,
            group,
          })
        );

      if (this.options.hasUser) {
        source = source.filter({ $has: { [this.options.hasUser]: user } });
      }

      if (this.options.isUser) {
        source = source.filter({ $at: { [this.options.isUser]: user } });
      }

      if (this.options.hasGroup) {
        source = source.filter({ $has: { [this.options.hasGroup]: group } });
      }

      if (this.options.isGroup) {
        source = source.filter({ $at: { [this.options.isGroup]: group } });
      }

      source = source.pick([], { x: 1 });

      const cursor = EntityDataCursor.create(
        this.connection,
        source.cursor,
        entityType
      );

      const loader = EntityDataLoader.createFromCursor(cursor);

      loader.qb.query.take = 1;

      let [sql] = EntityDataQueryExpToSqlTranslator.getQueryAndParameters(
        this.connection,
        loader.qb.query,
        parameters
      );

      allSql.push(`IFNULL((SELECT (${sql}) cx), 0)`);
    }

    if (!allSql.length) return ["1", parameters];
    if (allSql.length === 1) return [allSql[0], parameters];
    return [allSql.join(" AND "), parameters];
  }
}

export class AclRequest {
  allowCriterions: AclCriterion[] = [];
  denyCriterions: AclCriterion[] = [];

  constructor(public connection: Connection) {}

  allow<T, U = T>(options: AclCriterionOptions<T, U>): this {
    this.allowCriterions.push(
      new AclCriterion(this.connection, options as AnyAclCriterionOptions)
    );
    return this;
  }

  deny<T, U = T>(options: AclCriterionOptions<T, U>): this {
    this.denyCriterions.push(
      new AclCriterion(this.connection, options as AnyAclCriterionOptions)
    );
    return this;
  }

  async ask(userKey: string) {
    const parameters: any[] = [];

    const allowQuery = this.allowCriterions
      .toSeq()
      .map(c => c.getQueryAndParameters(userKey, parameters)[0])
      .join(" AND ");

    console.log({ allowQuery });

    const denyQuery = this.denyCriterions
      .toSeq()
      .map(c => c.getQueryAndParameters(userKey, parameters)[0])
      .join(" OR ");

    return this.connection
      .query(`SELECT NOT (${denyQuery}) AND ((${allowQuery})) cx`, parameters)
      .then(rows => {
        return !!rows[0].cx;
      });
  }
}

// AclRequestMap(req, {})
// review

/*

  AclRequest.allow({
    for: DataRow | [Forum, key];
    byUser: user => ({members: {$has: user}}),
    bySource: (source,{user}) => source.at(...)
      .filter({$at:{owner:user}},

    byPermission: "ADMIN"
  })

 */
// /*
//
// const forumReq = aclReq.categoryMap({
//
//   MAKE_POST: req=> req.allow(
//     ({user}, ds) => ds(Forum).filter({ $has:{members: user} })
//   )
//
// });
// const aclReqMap = aclReq.createTokenMap({
//   CAN_WRITE_POST:  (({user}, ds)=> ds().filter({ $has: {members} })),
//   BLOCKED_BY_OWNER: (({user}, ds)=> ds().filter({ $has: {members} })),
// })
//
// createAclTokens({
//
//
// })
//
//
// // DataAccess
// aclReq.allow()
// .den
//
// aclReqMap
//   .allow("CAN_WRITE_POST")
//   .deny("BLOCKED_BY_OWNER")
//
// access: RpcAccessToken()
//
//
// forumReq
//
//
// RpcMap({
//
//   access: RpcAccess("MAKE_POST", ""....),
//
//   makePost: RpcFn()
//
// })
//
//
// const makePostReq = forumReq.category("MAKE_POST")
//
//
//
//
//
//
//  */
//
// type AclExps = {
//   readonly user: DataExp<BasedType<User>>;
//   readonly group: DataExp<BasedType<Group>>;
// };
//
// export class AclRequestTokens<K extends string> {
//   constructor(
//     public req: AclRequest,
//     public tokenMap: Record<string, (exp: AclExps, gds: GetDataSource) => any>
//   ) {}
//
//   allow(key: K) {
//     return this;
//   }
//
//   deny(key: K) {
//     return this;
//   }
//
//   async assert() {}
// }
// type AclRequestCallback = (
//   exps: AclExps,
//   getDs: GetDataSource
// ) => DataSource<any>;
// export class AclRequest {
//   getDataSource: GetDataSource = type =>
//     EntityDataSource.create(type, this.connection);
//
//   constructor(public connection: () => Connection) {}
//
//   protected callbacks: {
//     type: "allow" | "deny";
//     callback: AclRequestCallback;
//   }[] = [];
//
//   protected denyCallbacks: AclRequestCallback[] = [];
//   protected allowCallbacks: AclRequestCallback[] = [];
//
//   createTokens<K extends string>(
//     tokenMap: Record<
//       K,
//       {
//         (exps: AclExps, getDs: GetDataSource): DataSource<any>;
//       }
//     >
//   ): AclRequestTokens<K> {
//     return new AclRequestTokens(this, tokenMap);
//   }
//
//   allow(callback: AclRequestCallback) {
//     this.allowCallbacks.push(callback);
//     return this;
//   }
//
//   deny(callback: AclRequestCallback) {
//     this.denyCallbacks.push(callback);
//     return this;
//   }
//
//   async ask(userId: string) {
//     let allQuery = "1";
//     let allParams: any[] = [];
//
//     const { getDataSource } = this;
//
//     function buildQuery(callback: AclRequestCallback[], isDeny = false) {
//       let allQuery = `SELECT 1 v`;
//       for (const buildDS of callback) {
//         const ds = buildDS(
//           {
//             user: { $is: userId },
//             group: { $has: { user: { $is: userId } } },
//           },
//           getDataSource
//         )
//           .take(1)
//           .pick([], {});
//
//         if (!(ds instanceof EntityDataSource)) {
//           throw new Error();
//         }
//         let [
//           query,
//           params,
//         ] = ds.createEntityLoader().qb.getQueryAndParameters();
//
//         allParams.push(...params);
//
//         const hasRows = `(SELECT COUNT(*) cx FROM (${query}) x LIMIT 1)`;
//
//         allQuery = `${allQuery} UNION SELECT ${hasRows} v`;
//       }
//       return allQuery;
//     }
//
//     const isAllowedQuery = buildQuery(this.allowCallbacks, false);
//     const isDeniedQuery = buildQuery(this.denyCallbacks, true);
//     allQuery = `SELECT (${isAllowedQuery}) AND NOT (${isDeniedQuery}) isAllowed`;
//
//     console.log({ allQuery });
//
//     const [{ isAllowed }] = await this.connection().query(
//       allQuery,
//       allParams
//     );
//
//     return Boolean(isAllowed);
//   }
// }
