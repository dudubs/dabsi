import { entries } from "@dabsi/common/object/entries";
import { hasKeys } from "@dabsi/common/object/hasKeys";
import { DataEntityCursor } from "@dabsi/typedata/data-entity/DataEntityCursor";
import { DataEntityKey } from "@dabsi/typedata/data-entity/DataEntityKey";
import { DataEntitySource } from "@dabsi/typedata/data-entity/DataEntitySource";
import { updateEntityRow } from "@dabsi/typedata/data-entity/sql/updateEntityRow";
import { DataKey } from "@dabsi/typedata/DataKey";
import { DataUpdate } from "@dabsi/typedata/DataValue";
import { DataEntityRelation } from "@dabsi/typeorm/relations";

export default function (
  source: DataEntitySource<any>,
  value: DataUpdate<any>,
  entityCursor: DataEntityCursor = source.entityCursor
) {
  const entity = {};

  const relations: {
    relation: DataEntityRelation;
    relationKey: DataEntityKey | null;
  }[] = [];

  // checking if cursor-relations-keys is override by cursor

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
      entity[propertyName] = propertyValue;
      continue;
    }
    throw new Error(`Invalid property ${propertyName}`);
  }

  const update = async (entityKey: DataEntityKey) => {
    if (hasKeys(entity)) {
      await entityCursor.entityManager.update(
        entityCursor.typeInfo.type,
        entityKey.object,
        entity
      );
      await updateEntityRow(
        source.getQueryRunner(),
        entityCursor.typeInfo.type,
        entityKey,
        entity
      );
    }

    for (const { relation, relationKey } of relations) {
      await relation.update(
        relationKey ? "addOrSet" : "removeOrUnset",
        entityKey.object!,
        relationKey?.object!
      );
    }
  };

  return {
    updateMany: async (keys: string[]) => {
      for (const entityTextKey of keys) {
        const entityKey = DataEntityKey.parse(
          entityCursor.entityMetadata,
          DataKey(entityTextKey)
        );
        await update(entityKey);
      }
    },
  };
  function buildRelation(
    relation: DataEntityRelation,
    relationKey: DataEntityKey | null
  ) {
    if (!relation.setEntityRow(entity, relationKey)) {
      relations.push({
        relation,
        relationKey,
      });
    }
  }
}
