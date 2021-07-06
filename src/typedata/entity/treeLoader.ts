import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import defined from "@dabsi/common/object/defined";
import { touchObject } from "@dabsi/common/object/touchObject";
import { DataEntityKey } from "@dabsi/typedata/entity/key";
import { DataEntityLoader } from "@dabsi/typedata/entity/loader";
import { DataQueryBuilder } from "@dabsi/typedata/query/builder";
import { DataQuery } from "@dabsi/typedata/query/exp";
import { DataTreeRow } from "@dabsi/typedata/row";
import { DataSource } from "@dabsi/typedata/source/source";
import { DataEntityRelation } from "@dabsi/typeorm/relations";
import { RelationMetadata } from "typeorm/metadata/RelationMetadata";

type TreeQueryOptions = {
  minDepth?: number;
  maxDepth?: number;
  inverse?: boolean;
};

export class DataEntityTreeLoader {
  relationMetadata: RelationMetadata = defined(
    this.loader.entityMetadata.relations.find(
      r => r.propertyName === this.relationPropertyName
    ),
    () =>
      `No relation like "${this.loader.typeInfo.name}.${this.relationPropertyName}".`
  );

  ownerRelationMetadata: RelationMetadata = this.relationMetadata.isOwning
    ? this.relationMetadata
    : this.relationMetadata.inverseRelation!;

  selectedQuery = this.loader.query;

  rootSchema = this.relationMetadata.isOwning
    ? this.selectedQuery.alias
    : "root";

  constructor(
    public loader: DataEntityLoader,
    protected relationPropertyName: string
  ) {}

  async loadRootKeys() {
    const rows = await this.loader.queryRunner.getRows(
      this.getRootQuery(
        mapArrayToObject(this.loader.entityMetadata.primaryColumns, column => [
          column.propertyName,
          {
            $at: [this.rootSchema, column.databaseName],
          },
        ])
      )
    );
    return rows.map(row =>
      DataEntityKey.stringify(this.loader.entityMetadata, row)
    );
  }

  getTreeQuery({
    minDepth = 0,
    maxDepth = 0,
    inverse = false,
  }: TreeQueryOptions = {}): DataQuery {
    const rootRowId = { $at: [this.rootSchema, "ROWID"] };

    const concatPath = (id, ...parent) => ({
      $concat: [...parent, ["{"], id, ["}"]],
    });

    const childConditions: any[] = [
      [
        // check tree cycle
        "parent._path",
        "$notContains",
        concatPath("child.ROWID"),
      ],
    ];
    const rootFieldMap = {
      _id: rootRowId,
      _depth: 0,
      _path: concatPath(rootRowId),
    };

    const childFieldMap = {
      _id: "child.ROWID",
      _depth: { $add: [1, "parent._depth"] },
      _path: concatPath("child.ROWID", "parent._path"),
    };

    if (maxDepth) {
      childConditions.push([maxDepth, ">=", "parent._depth"]);
    }

    const {
      ownerRelationMetadata: { joinTableName, joinColumns, inverseJoinColumns },
      loader: {
        entityMetadata: { primaryColumns },
      },
    } = this;

    //

    let childQuery: DataQuery;

    if (joinTableName) {
      for (const { databaseName, propertyName } of primaryColumns) {
        rootFieldMap[propertyName] = {
          $at: [this.rootSchema, databaseName],
        };

        childFieldMap[propertyName] = {
          $at: { child: databaseName },
        };
      }

      const [leftJoinColumns, rightJoinColumns] = joinTableName
        ? inverse
          ? [joinColumns, inverseJoinColumns]
          : [inverseJoinColumns, joinColumns]
        : [joinColumns, joinColumns];

      childQuery = {
        from: this.ownerRelationMetadata.joinTableName,
        alias: "rel",
        fields: childFieldMap,
        joins: {
          parent: {
            type: "INNER",
            from: "tree",
            condition: {
              $and: leftJoinColumns.map(column => [
                { $at: { parent: column.referencedColumn!.databaseName } },
                "=",
                { $at: { rel: column.databaseName } },
              ]),
            },
          },
          child: {
            type: "INNER",
            from: this.selectedQuery.from,
            condition: {
              $and: rightJoinColumns.map(column => [
                { $at: { child: column.referencedColumn!.databaseName } },
                "=",
                { $at: { rel: column.databaseName } },
              ]),
            },
          },
        },
      };
    } else {
      const joinConditions = joinColumns.map(
        ({
          referencedColumn: primaryColumn,
          databaseName: foriegnDatabaseName,
        }) => {
          const {
            propertyName: primaryPropertyName,
            databaseName: primaryDatabaseName,
          } = primaryColumn!;

          const [fieldDatabaseName, joinDatabaseName] = inverse
            ? [foriegnDatabaseName, primaryDatabaseName]
            : [primaryDatabaseName, foriegnDatabaseName];

          rootFieldMap[primaryPropertyName] = {
            $at: [this.rootSchema, fieldDatabaseName],
          };

          childFieldMap[primaryPropertyName] = {
            $at: { child: fieldDatabaseName },
          };

          return [
            { $at: { parent: primaryPropertyName } },
            "=",
            { $at: { child: joinDatabaseName } },
          ];
        }
      );

      childQuery = {
        from: this.selectedQuery.from,
        alias: "child",
        fields: childFieldMap,
        joins: {
          parent: {
            type: "INNER",
            from: "tree",
            condition: { $and: joinConditions },
          },
        },
        where: {
          $and: childConditions,
        },
      };
    }
    return {
      with: {
        tree: {
          fields: Object.keys(rootFieldMap),
          queries: [this.getRootQuery(rootFieldMap), childQuery],
        },
      },
      from: "tree",
      alias: "tree",
      fields: {
        _path: "tree._path",
        _depth: "tree._depth",
        _id: "tree._id",
        ...this.selectedQuery.fields,
      },
      where: ["tree._depth", ">=", minDepth],
      joins: {
        ...this.selectedQuery.joins,
        [this.selectedQuery.alias]: {
          type: "INNER",
          from: this.selectedQuery.from,
          condition: [
            //
            { $at: [this.selectedQuery.alias, "ROWID"] },
            "=",
            "tree._id",
          ],
        },
      },
    };
  }

  async loadTreeRows<T = any>(
    source: DataSource<any>,
    { minDepth = 0, ...options }: TreeQueryOptions = {}
  ): Promise<DataTreeRow<T>[]> {
    const treeQuery = this.getTreeQuery({ ...options, minDepth });

    const raws = await this.loader.queryRunner.getRows(treeQuery);
    const pathRowMap: Record<string, any> = {};
    const pathRowChildrenMap: Record<string, any[]> = {};
    const rootPaths: string[] = [];

    const rowLoader = this.loader.buildRowLoader(source);

    for (const raw of raws) {
      const { _path: path, _depth: depth } = raw as {
        _depth: number;
        _path: string;
      };
      const { row } = (await this.loader.loadOneRow(raw, rowLoader, source))!;
      row.$path = path;
      row.$depth = depth;
      row.$children = touchObject(pathRowChildrenMap, path, () => []);

      pathRowMap[path] = row;

      const parentPath = path.substr(0, path.lastIndexOf("{")) || null;
      if (parentPath) {
        touchObject(pathRowChildrenMap, parentPath, () => []).push(row);

        Object.defineProperty(row, "$parent", {
          get() {
            return pathRowMap[parentPath];
          },
        });
      }
      if (depth === minDepth) {
        rootPaths.push(path);
      }
    }
    return rootPaths.map(path => pathRowMap[path]);
  }

  getRootQuery(fieldMap: Record<string, any>): DataQuery {
    if (this.relationMetadata.isOwning) {
      return { ...this.selectedQuery, fields: fieldMap };
    }

    const query: DataQuery = { ...this.selectedQuery, fields: fieldMap };
    const queryBuilder = new DataQueryBuilder(query);
    const relation = new DataEntityRelation(
      this.loader.connection,
      this.loader.typeInfo.type,
      this.relationPropertyName,
      false
    );
    relation.join(
      "INNER",
      queryBuilder,
      this.selectedQuery.alias,
      null,
      this.rootSchema
    );
    return query;
  }
}
