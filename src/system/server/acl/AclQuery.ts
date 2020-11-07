import { Connection } from "typeorm";
import { reversed } from "../../../common/array/reversed";
import { entries } from "../../../common/object/entries";
import { mapObject } from "../../../common/object/mapObject";
import { Type } from "../../../common/typings";
import { WeakId } from "../../../common/WeakId";
import { DataExp } from "../../../typedata/data-exp/DataExp";
import { getExpNode } from "../../../typedata/data-exp/getExpNode";
import { EntityDataQueryExpToSqlTranslator } from "../../../typedata/data-query/EntityDataQueryExpToSqlTranslator";
import { DataCursor, EmptyDataCursor } from "../../../typedata/DataCursor";
import { EntityDataCursor } from "../../../typedata/entity-data/EntityDataCursor";
import { EntityDataLoader } from "../../../typedata/entity-data/EntityDataLoader";
import { AclCriterion, AclCriterionExps } from "./AclCriterion";
import { AclCriterionExp, AclExp, AclExpMap } from "./AclExp";
import { AclTokenTree } from "./AclTokenTree";
import { Permission } from "./Permission";

export class AclQuery {
  constructor(protected connection: Connection) {}

  protected getCriterionName(criterion: AclCriterionExp) {
    return `CRITERION:${WeakId(criterion)}`;
  }

  protected getPermissionName(token: string) {
    return `PERMISSION:${token}`;
  }

  protected escapeName(name: string) {
    return "`" + name + "`";
  }

  protected getEntityQuery<T>(
    entityType: Type<T>,
    cursor: DataCursor,
    filter: DataExp<T>
  ): string {
    const entityCursor = EntityDataCursor.create(
      this.connection,
      {
        ...cursor,
        take: 1,
        selection: { pick: [], ...cursor.selection },
        filter: DataExp(cursor.filter, filter),
      },
      entityType
    );
    const loader = EntityDataLoader.createFromCursor(entityCursor);

    loader.qb.query.take = 1;

    const query = EntityDataQueryExpToSqlTranslator.createFromEntityLoader(
      loader,
      this.parameters
    ).translateQueryWithoutFields(loader.qb.query);
    return `(SELECT COUNT(*) ${query})`;
  }

  criterions: Set<AclCriterionExp>;
  tokenTree: AclTokenTree;

  askFor(userKey: string): this {
    this.userKey = userKey;
    return this;
  }

  getExpQuery(exp: AclExp): string {
    switch (typeof exp) {
      case "string":
        this.tokenTree.add(exp);
        return this.escapeName(this.getPermissionName(exp));

      case "function":
        this.criterions.add(exp);
        return this.escapeName(this.getCriterionName(exp));
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
    }
  }

  ask(exp: AclExp) {
    return this.askMap({ RESULT: exp }).then(row => row.RESULT);
  }

  askMap<K extends string>(
    expMap: Record<K, AclExp>
  ): Promise<Record<K, boolean>> {
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

  parameters: any[];

  userKey: string;

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
    const user = { $is: this.userKey };

    for (let subToken of subTokens) {
      query +=
        (query ? " OR " : "") +
        this.escapeName(this.getPermissionName(subToken));
    }
    return (
      (query ? query + " OR " : "") +
      this.getEntityQuery(Permission, EmptyDataCursor, {
        $and: [
          {
            $or: [
              { $at: { user } }, //
              { $at: { group: { $has: { users: user } } } }, //
            ],
          },
          { token },
        ],
      }) +
      " AS" +
      this.escapeName(this.getPermissionName(token))
    );
  }

  getCriterionsQuery() {
    let fields = "";
    for (const criterionExp of this.criterions) {
      const aliasName = this.getCriterionName(criterionExp);
      const criterion = criterionExp(dataRow => AclCriterion.create(dataRow));
      const exps = new AclCriterionExps(this.userKey);
      fields +=
        (fields ? "," : "") +
        this.getEntityQuery(
          criterion.entityType,
          criterion.cursor,
          criterion.getFilter(exps)
        ) +
        " AS " +
        this.escapeName(aliasName);
    }
    return fields ? `SELECT (${fields}) _criterions` : "";
  }

  askAll(getQuery: () => string) {
    this.parameters = [];
    this.criterions = new Set();
    this.tokenTree = new AclTokenTree();
    let query = "SELECT" + getQuery();

    const fromQuery = [this.getCriterionsQuery(), this.getPermissionsQuery()]
      .filter(query => !!query)
      .join(",");

    if (fromQuery) query += ` FROM ${fromQuery}`;
    return this.connection.query(query, this.parameters).then(rows => rows[0]);
  }
}
