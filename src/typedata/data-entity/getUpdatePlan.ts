import { entries } from "@dabsi/common/object/entries";
import { hasKeys } from "@dabsi/common/object/hasKeys";
import { DataEntityCursor } from "@dabsi/typedata/data-entity/DataEntityCursor";
import { updateEntityRow } from "@dabsi/typedata/data-entity/sql/updateEntityRow";
import { DataEntityKey } from "@dabsi/typedata/data-entity/DataEntityKey";
import { DataChangeReason } from "@dabsi/typedata/data-entity/DataEntityListener";
import { DataEntitySource } from "@dabsi/typedata/data-entity/DataEntitySource";
import { DataKey } from "@dabsi/typedata/DataKey";
import { DataUpdate } from "@dabsi/typedata/DataValue";
import { DataEntityRelation } from "@dabsi/typeorm/relations";

export default function (
  source: DataEntitySource<any>,
  value: DataUpdate<any>,
  entityCursor: DataEntityCursor = source.entityCursor
) {
  const row = {};

  const selectionRelations: any = {};

  const relationKeys: {
    relation: DataEntityRelation;
    relationKey: DataEntityKey | null;
    isOwnerByColumn: boolean;
  }[] = [];

  // checking if cursor-relations-keys is override by cursor

  const buildRelation = (
    relation: DataEntityRelation,
    relationKey: DataEntityKey | null
  ) => {
    if (source.hasRelationListener(relation.relationMetadata)) {
      selectionRelations[relation.propertyName] = { pick: [] };
    }

    const isOwnerByColumn = relation.setOwnerByColumn(row, relationKey);

    relationKeys.push({
      relation,
      relationKey,
      isOwnerByColumn,
    });
  };

  for (const { relation } of entityCursor.relationKeys) {
    if (relation.propertyName in value) {
      throw new Error(`Can't override relation ${relation.propertyName}.`);
    }
  }

  for (const {
    metadata: { propertyName },
  } of entityCursor.columnKeys) {
    if (propertyName in value) {
      throw new Error(`Can't override field ${propertyName}.`);
    }
  }

  for (let [propertyName, propertyValue] of entries(value)) {
    const relation = entityCursor.entityInfo.propertyRelationMap[propertyName];

    if (propertyValue === undefined) {
      // skip on property if is undefined - no if is null.
      continue;
    }

    if (relation) {
      if (propertyValue && typeof propertyValue === "object") {
        if (typeof propertyValue.$key === "string") {
          propertyValue = propertyValue.$key;
        }
      }

      const key = DataEntityKey.parse(
        relation.right.entityMetadata,
        propertyValue
      );
      buildRelation(relation, key);
      continue;
    }

    const column =
      entityCursor.entityInfo.propertyNameToColumnMetadata[propertyName];
    if (column) {
      row[propertyName] = propertyValue;
      continue;
    }
    throw new Error(`Invalid property ${propertyName}`);
  }

  let entityRowMap: Record<string, any>;

  const selection: any = {};

  if (hasKeys(selectionRelations)) {
    selection.relations = selectionRelations;
  }

  const update = async (entityKey: DataEntityKey) => {
    const entityRow = entityRowMap[entityKey.text];

    if (hasKeys(row)) {
      await updateEntityRow(
        source.getQueryRunner(),
        entityCursor.typeInfo.type,
        entityKey,
        row
      );
    }

    for (const {
      relation,
      relationKey: newRelationKey,
      isOwnerByColumn,
    } of relationKeys) {
      const oldRelationTextKey = entityRow?.[relation.propertyName]?.$key;
      const newRelationTextKey = newRelationKey?.text ?? null;
      if (oldRelationTextKey == newRelationTextKey) continue;

      if (!isOwnerByColumn) {
        await relation.update(
          newRelationKey ? "addOrSet" : "removeOrUnset",
          entityKey.object!,
          newRelationKey?.object!
        );
      }

      const { relationMetadata } = relation;

      await source.emitRelationChange?.({
        relationMetadata,
        reason: DataChangeReason.UPDATE,
        newRelationKey: newRelationKey?.text ?? null,
        oldRelationKey: oldRelationTextKey,
        entityKey: entityKey.text,
      });

      if (relationMetadata.inverseRelation) {
        oldRelationTextKey &&
          (await source.emitRelationChange?.({
            relationMetadata: relationMetadata.inverseRelation,
            reason: DataChangeReason.UPDATE,
            entityKey: oldRelationTextKey,
            newRelationKey: null,
            oldRelationKey: entityKey.text,
          }));
      }
    }
  };

  return {
    updateMany: async (keys: string[]) => {
      entityRowMap = !hasKeys(selection)
        ? {}
        : await source
            .createEntitySource(entityCursor.typeInfo.type)
            .select(selection)
            .filter({ $is: keys })
            .getRowMap();

      for (const entityTextKey of keys) {
        const entityKey = DataEntityKey.parse(
          entityCursor.entityMetadata,
          DataKey(entityTextKey)
        );

        await update(entityKey);
      }
    },
  };
}
