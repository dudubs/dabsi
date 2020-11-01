import { Connection } from "typeorm";
import { ExtractKeys, Type } from "../../../common/typings";
import { BasedType } from "../../../typedata/BaseType";
import { DataExp } from "../../../typedata/data-exp/DataExp";
import { EntityDataQueryExpToSqlTranslator } from "../../../typedata/data-query/EntityDataQueryExpToSqlTranslator";
import { DataSource } from "../../../typedata/DataSource";
import { EntityDataCursor } from "../../../typedata/entity-data/EntityDataCursor";
import { EntityDataLoader } from "../../../typedata/entity-data/EntityDataLoader";
import { EntityDataSource } from "../../../typedata/entity-data/EntityDataSource";
import { Relation } from "../../../typedata/Relation";
import { Group } from "./Group";
import { User } from "./User";

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
export type AnyAclCriterion = AclCriterion<any, any>;
export type AclCriterion<T, U, B = {}> =
  | (B & _WithBySource<T, U>)
  | (B & _WithoutBySource<T>);

export function AclCriterion<T, U = T>(
  options: AclCriterion<T, U>
): AnyAclCriterion {
  return options as AnyAclCriterion;
}

export namespace AclCriterion {
  export function ask(
    connection: Connection,
    options: AnyAclCriterion,
    userKey: string
  ): Promise<boolean> {
    const [sql, params] = getQueryAndParameters(connection, options, userKey);
    return connection
      .query(`SELECT (${sql}) cx`, params)
      .then(rows => !!rows[0]?.cx);
  }

  export function getQueryAndParameters(
    connection: Connection,
    criterion: AnyAclCriterion,
    userKey: string,
    parameters: any[] = []
  ): [string, any[]] {
    const allSql: string[] = [];
    if (criterion.for) {
      const [entityType, entityKey] = criterion.for;

      let source: DataSource<any> = EntityDataSource.create(
        entityType,
        () => connection
      ).filter({ $is: entityKey });

      if (criterion.bySource)
        source = criterion.bySource(source as DataSource<any>);

      const user = { $is: userKey };
      const group: DataExp<Group> = { $has: { users: user } };

      if (criterion.byFilter)
        source = source.filter(
          criterion.byFilter({
            user,
            group,
          })
        );

      if (criterion.hasUser) {
        source = source.filter({ $has: { [criterion.hasUser]: user } });
      }

      if (criterion.isUser) {
        source = source.filter({ $at: { [criterion.isUser]: user } });
      }

      if (criterion.hasGroup) {
        source = source.filter({ $has: { [criterion.hasGroup]: group } });
      }

      if (criterion.isGroup) {
        source = source.filter({ $at: { [criterion.isGroup]: group } });
      }

      source = source.pick([], { x: 1 });

      const cursor = EntityDataCursor.create(
        connection,
        source.cursor,
        entityType
      );

      const loader = EntityDataLoader.createFromCursor(cursor);

      loader.qb.query.take = 1;

      let [query] = EntityDataQueryExpToSqlTranslator.getQueryAndParameters(
        connection,
        loader.qb.query,
        parameters
      );

      allSql.push(`IFNULL((SELECT (${query}) cx), 0)`);
    }

    if (!allSql.length) return ["1", parameters];
    if (allSql.length === 1) return [allSql[0], parameters];
    return [allSql.join(" AND "), parameters];
  }
}
