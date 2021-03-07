import { touchObject } from "@dabsi/common/object/touchObject";
import { DataEntityLoader } from "@dabsi/typedata/entity/loader";
import { DataOrder } from "@dabsi/typedata/order";
import { DataQuery } from "@dabsi/typedata/query/exp";

export async function loadEntityTree({
  loader,
  relationPropertyName,
  rowLoader,
  inverse = false,
}: {
  loader: DataEntityLoader;
  relationPropertyName: string;
  inverse?: boolean;
  startDepth?: number;
  rowLoader?: (props: {
    row: any;
    path: string;
    depth: number;
    pathRowMap: Record<string, any>;
    pathChildrenMap: Record<string, string[]>;
    rootPaths: string[];
  }) => any;
}) {
  const relationMetadata = loader.entityMetadata.relations.find(
    r => r.propertyName === relationPropertyName
  )!;

  const minDepth = 0;
  // inverse ? 1 : relationMetadata.isOwning ? 0 : 1;

  const ownerRelationMetadata = relationMetadata.isOwning
    ? relationMetadata
    : relationMetadata.inverseRelation!;

  const { query: selectedQuery } = loader;

  const selectedSchema = selectedQuery.alias;

  let rootQuery: DataQuery;

  if (relationMetadata.isOneToMany /*children */) {
    // children

    rootQuery = {
      from: selectedQuery.from,
      alias: "children",
      joins: {
        [selectedSchema]: {
          type: "INNER",
          from: selectedQuery.from,
          condition: {
            $and: ownerRelationMetadata.joinColumns.map(jc => [
              //
              { $at: ["children", jc.databaseName] },
              "=",
              { $at: [selectedSchema, jc.referencedColumn!.databaseName] },
            ]),
          },
        },
      },
    };
  } else {
    rootQuery = selectedQuery;
  }

  const rootSchema = rootQuery.alias;
  const rootRowId = { $at: [rootSchema, "ROWID"] };
  const rootFields = {
    _id: rootRowId,
    _path: inverse ? [""] : { $concat: [["/"], rootRowId] },
    _depth: 0,
  };

  const treeFields = ["_id", "_path", "_depth"];
  const treeJoinCondition: any[] = [];

  // debug max depth
  treeJoinCondition.push([10, ">", "parent._depth"]);

  const childFields = {
    _id: "child.ROWID",
    _path: {
      $join: [["parent._path", "child.ROWID"], "/"],
    },
    _depth: { $add: [1, "parent._depth"] },
  };

  for (const jc of ownerRelationMetadata.joinColumns) {
    const {
      propertyName: primaryPropertyName,
      databaseName: primaryDatabaseName,
    } = jc.referencedColumn!;

    rootFields[primaryPropertyName] = {
      $at: [rootSchema, primaryDatabaseName],
    };

    treeFields.push(primaryPropertyName);

    const [childDatabaseName, rootDatabaseName] = inverse
      ? [jc.databaseName, primaryDatabaseName]
      : [primaryDatabaseName, jc.databaseName];

    childFields[primaryPropertyName] = {
      $at: { child: childDatabaseName },
    };

    treeJoinCondition.push([
      //
      { $at: { child: rootDatabaseName } },
      "=",
      { $at: { parent: primaryPropertyName } },
    ]);
  }

  // TODO: By ROW_INDEX
  const treeOrders: DataOrder<any>[] = [];

  for (const [i, { by, sort, nulls }] of (rootQuery.order || []).entries()) {
    const n = "_o_" + i;
    rootFields[n] = by;
    treeFields.push(n);
    childFields[n] = { $at: { parent: n } };
    treeOrders.push({ by: { $at: { tree: n } }, sort, nulls });
  }

  const treeQuery: DataQuery = {
    with: {
      tree: {
        fields: treeFields,
        queries: [
          {
            ...rootQuery,
            order: undefined,
            fields: rootFields,
          },
          {
            from: rootQuery.from,
            alias: "child",
            joins: {
              parent: {
                type: "INNER",
                from: "tree",
                condition: { $and: treeJoinCondition },
              },
            },
            fields: childFields,
            where: [
              "parent._path",
              "$notContains",
              {
                $concat: [["/"], "child.ROWID"],
              },
            ],
          },
        ],
      },
    },
    from: "tree",
    alias: "tree",
    fields: {
      _path: "tree._path",
      _depth: "tree._depth",
      ...rootQuery.fields,
    },
    order: [
      //
      ...treeOrders,
      // { by: { $at: { tree: "_path" } }, sort: "ASC" },
    ],
    where: ["tree._depth", ">=", minDepth],
    joins: {
      [rootSchema]: {
        from: rootQuery.from,
        type: "INNER",
        fields: undefined,
        condition: [{ $at: [rootSchema, "ROWID"] }, "=", "tree._id"],
      },
      ...rootQuery.joins,
    },
  };

  const pathRowMap: Record<string, any> = {};
  const pathChildrenMap: Record<string, string[]> = {};
  const rootPaths: string[] = [];

  const rows = await loader.queryRunner.getRows(treeQuery);

  for (const raw of rows) {
    const { _path: path, _depth: depth } = raw;
    if (depth === minDepth) {
      rootPaths.push(path);
    }
    const { row } = (await loader.loadOneRow(raw))!;
    if (path in pathRowMap) {
      console.log("duplicated ", path);
    }
    pathRowMap[path] = row;

    // debug depth
    row.$depth = depth;
    row.$path = path;

    const parentPath = path.substr(0, path.lastIndexOf("/"));
    touchObject(pathChildrenMap, parentPath, () => []).push(path);

    await rowLoader?.({
      row,
      path,
      depth,
      pathRowMap,
      pathChildrenMap,
      rootPaths,
    });
  }

  return { pathRowMap, pathChildrenMap, rootPaths };
}
