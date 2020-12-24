import { Connection } from "typeorm";
import { reversed } from "@dabsi/common/array/reversed";
import { touchMap } from "@dabsi/common/map/touchMap";
import { entries } from "@dabsi/common/object/entries";
import { hasKeys } from "@dabsi/common/object/hasKeys";
import { mapObject } from "@dabsi/common/object/mapObject";
import { touchObject } from "@dabsi/common/object/touchObject";
import { values } from "@dabsi/common/object/values";
import { Type } from "@dabsi/common/typings2/Type";
import { WeakId } from "@dabsi/common/WeakId";
import { DataExp } from "@dabsi/typedata/data-exp/DataExp";
import { getExpNode } from "@dabsi/typedata/data-exp/getExpNode";
import { DataCursor, EmptyDataCursor } from "@dabsi/typedata/DataCursor";
import { DataTypeInfo } from "@dabsi/typedata/DataTypeInfo";
import { DataEntityCursor } from "@dabsi/typedata/data-entity/DataEntityCursor";
import { DataEntityExpTranslatorToDataQueryExp } from "@dabsi/typedata/data-entity/DataEntityExpTranslatorToDataQueryExp";
import { DataEntityQueryExpTranslatorToSql } from "@dabsi/typedata/data-entity/DataEntityQueryExpTranslatorToSql";
import {
  AclCriterion,
  AclCriterionExps,
} from "@dabsi/system-old/server/acl/AclCriterion";
import {
  AclCriterionExp,
  AclExp,
  AclExpMap,
} from "@dabsi/system-old/server/acl/AclExp";
import { AclTokenTree } from "@dabsi/system-old/server/acl/AclTokenTree";
import { Permission } from "@dabsi/system-old/server/acl/Permission";
import { User } from "@dabsi/system/acl/entities/User";

export class AclQuery {
  constructor(protected connection: Connection) {}

  protected getPermissionAliasName(token: string) {
    return `PERMISSION:${token}`;
  }

  protected escapeName(name: string) {
    return "`" + name + "`";
  }

  criterionMap: {
    [aliasName: string]: {
      escapedAliasName: string;
      exp: AclCriterionExp;
    };
  };
  tokenTree: AclTokenTree;

  askFor(userKey: string): this {
    this.userKey = userKey;
    return this;
  }

  getExpQuery(exp: AclExp): string {
    switch (typeof exp) {
      case "string":
        this.tokenTree.add(exp);
        return this.escapeName(this.getPermissionAliasName(exp));

      case "function":
        return touchObject(
          this.criterionMap,
          `CRITERION:${WeakId(exp)}`,
          aliasName => {
            return {
              exp,
              escapedAliasName: this.escapeName(aliasName),
            };
          }
        ).escapedAliasName;
    }
    const node = getExpNode<AclExpMap>(exp);

    // optimizing
    switch (node.type) {
      case "$any":
      case "$all":
        if (node.value.length === 1) {
          return this.getExpQuery(node.value[0]);
        }
    }
    switch (node.type) {
      case "$not":
        return `NOT ${this.getExpQuery(node.value)}`;
      case "$all":
        return `(${node.value
          .map(exp => this.getExpQuery(exp))
          .join(" AND ")})`;
      case "$any":
        return `(${node.value.map(exp => this.getExpQuery(exp)).join(" OR ")})`;
      case "$privilege":
        return `NOT (${
          node.value.allow?.map(exp => this.getExpQuery(exp)).join(" AND ") ||
          "0"
        })) AND (${
          node.value.allow?.map(exp => this.getExpQuery(exp)).join(" AND ") ||
          "1"
        })`;
      case "$user":
        if (!node.value || typeof node.value !== "object")
          throw new TypeError("$user must to be object.");
        return touchMap(this.userEscapedFieldMap, node.value, exp => {
          const aliasName = `USER:${counter++}`;
          this.userFieldExpMap[aliasName] = node.value;
          return this.escapeName(aliasName);
        });
    }
  }

  ask(exp: AclExp) {
    return this.askMap({ RESULT: exp }).then(row => row.RESULT);
  }

  askMap<K extends string>(
    expMap: Record<K, AclExp>
  ): Promise<Record<K, boolean>> {
    if (!hasKeys(expMap)) return Promise.resolve({} as any);
    return this.askAll(() => {
      let fields = "";
      for (const [key, exp] of entries(expMap)) {
        fields +=
          (fields ? "," : "") +
          this.getExpQuery(exp) +
          " AS " +
          this.escapeName(key);
      }
      return fields;
    }).then(row => mapObject(row, Boolean));
  }

  protected getPermissionsQuery() {
    let query = "";
    for (const table of reversed(this.tokenTree.getTable())) {
      let fields = "";
      for (const { token, subTokens } of table) {
        fields += (fields ? "," : "") + this.getTokenQuery(token, subTokens);
      }
      if (!fields) continue;
      query = query
        ? `SELECT *, ${fields} FROM (${query}) fx`
        : `SELECT ${fields}`;
    }
    return query ? `(${query}) _permissions` : "";
  }

  protected getTokenQuery(token: string, subTokens: string[]) {
    let query = ``;

    for (let subToken of subTokens) {
      query +=
        (query ? " OR " : "") +
        this.escapeName(this.getPermissionAliasName(subToken));
    }
    const user = { $is: this.userKey };
    const permissionQuery = this.createEntityQuery(
      Permission,
      EmptyDataCursor,
      {
        $and: [
          {
            $or: [
              { $at: { user } }, //
              { $at: { group: { $has: { users: user } } } }, //
            ],
          },
          { token },
        ],
      }
    ).getCountQuery();

    return (
      (query ? query + " OR " : "") +
      permissionQuery +
      " AS" +
      this.escapeName(this.getPermissionAliasName(token))
    );
  }

  getCriterionsQuery() {
    let fields = "";
    for (const { exp, escapedAliasName } of values(this.criterionMap)) {
      const criterion = exp(dataRow => AclCriterion.create(dataRow));
      const exps = new AclCriterionExps(this.userKey);
      fields +=
        (fields ? "," : "") +
        this.createEntityQuery(
          criterion.entityType,
          criterion.cursor,
          criterion.getFilter(exps)
        ).getCountQuery() +
        " AS " +
        escapedAliasName;
    }
    return fields ? `(SELECT ${fields}) _criterions` : "";
  }

  userFieldExpMap: Record<string, DataExp<User>>;
  userEscapedFieldMap: Map<DataExp<User>, string>;

  protected createEntityQuery<T>(
    entityType: Type<T>,
    cursor: DataCursor,
    filter: DataExp<T>
  ) {
    const entityCursor = DataEntityCursor.createFromConnection(
      this.connection,
      {
        ...cursor,
        take: 1,
        selection: { pick: [], ...cursor.selection },
        filter: DataExp(cursor.filter, filter),
      },
      entityType
    );

    const qb = DataEntityCursor.createQueryBuilder(entityCursor);
    qb.query.take = 1;

    const translatorToQueryExp = new DataEntityExpTranslatorToDataQueryExp(
      this.connection,
      DataTypeInfo.get(User),
      qb,
      qb.query.alias
    );

    const translatorToSql = new DataEntityQueryExpTranslatorToSql(
      this.connection,
      qb.query.alias,
      this.parameters
    );

    return {
      getQueryWithoutFields() {
        return translatorToSql.translateQueryWithoutFields(qb.query);
      },
      getCountQuery() {
        return `(SELECT COUNT(*) ${this.getQueryWithoutFields()})`;
      },
      getQueryWithFields(fieldMap: Record<string, DataExp<any>>) {
        qb.query.fields = mapObject(fieldMap, exp =>
          translatorToQueryExp.translate(exp)
        );
        return translatorToSql.translateQuery(qb.query);
      },
    };
  }

  protected getUserQuery(): string {
    if (!hasKeys(this.userFieldExpMap)) return "";

    return `(${this.createEntityQuery(User, EmptyDataCursor, {
      $is: this.userKey,
    }).getQueryWithFields(this.userFieldExpMap)}) _user`;
  }

  parameters: any[];
  userKey: string;

  askAll(getQuery: () => string) {
    this.parameters = [];
    this.criterionMap = {};
    this.userFieldExpMap = {};
    this.userEscapedFieldMap = new Map();
    this.tokenTree = new AclTokenTree();
    let query = "SELECT " + getQuery();

    const fromQuery = [
      this.getCriterionsQuery(),
      this.getPermissionsQuery(),
      this.getUserQuery(),
    ]
      .filter(query => !!query)
      .join(",");

    if (fromQuery) query += ` FROM ${fromQuery}`;
    return this.connection.query(query, this.parameters).then(rows => rows[0]);
  }
}

let counter = 0;
