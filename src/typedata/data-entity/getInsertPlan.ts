import { entries } from "@dabsi/common/object/entries";
import { DataEntityKey } from "@dabsi/typedata/data-entity/DataEntityKey";
import { DataEntitySource } from "@dabsi/typedata/data-entity/DataEntitySource";
import {
  DataChangeReason,
  DataRelationChange,
} from "@dabsi/typedata/data-entity/DataEntityListener";
import { DataInsert } from "@dabsi/typedata/DataValue";
import { DataEntityRelation } from "@dabsi/typeorm/relations";

import { inspect } from "@dabsi/logging/inspect";
import { insertEntityRow } from "@dabsi/typedata/data-entity/sql/insertEntityRow";

export default (source: DataEntitySource<any>, value: DataInsert<any>) => {
  const row = {};
  const {
    entityCursor,
    entityCursor: { parent: parentEntityCursor },
  } = source;
  const relationKeys: {
    relation: DataEntityRelation;
    relationKey: DataEntityKey;
    isOwnerByColumn: boolean;
  }[] = [];

  //

  parentEntityCursor &&
    buildRelation(parentEntityCursor.relation, parentEntityCursor.relationKey);

  for (const { relation, key: relationKey } of entityCursor.relationKeys) {
    if (relation.propertyName in value) {
      throw new Error(`Can't override relation ${relation.propertyName}.`);
    }
    // build relation on insert.
    buildRelation(relation, relationKey);
  }

  for (const {
    metadata: { propertyName },
    key,
  } of entityCursor.columnKeys) {
    if (propertyName in value) {
      throw new Error(`Can't override field ${propertyName}.`);
    }
    row[propertyName] = key;
  }

  for (let [propertyName, propertyValue] of entries(value)) {
    if (propertyValue == null) continue;

    const relation = entityCursor.entityInfo.propertyRelationMap[propertyName];

    if (propertyValue === undefined) {
      // skip on property if is undefined - no if is null.
      continue;
    }
    if (relation) {
      // TODO: by data-source.
      if (propertyValue && typeof propertyValue === "object") {
        if (typeof propertyValue.$key === "string") {
          propertyValue = propertyValue.$key;
        }
      }

      const relationKey = DataEntityKey.parse(
        relation.right.entityMetadata,
        propertyValue
      );
      buildRelation(relation, relationKey);
      continue;
    }

    const column =
      entityCursor.entityInfo.propertyNameToColumnMetadata[propertyName];
    if (!column) throw new Error(`Invalid property ${propertyName}`);
    row[propertyName] = propertyValue;
  }

  return {
    insert: async () => {
      // before
      // insert

      const entityKey = await insertEntityRow(
        source.getQueryRunner(),
        entityCursor.typeInfo.type,
        row
      );

      const baseRelationChange = {
        reason: DataChangeReason.INSERT,
        oldRelationKey: null,
      };

      for (const { relation, relationKey, isOwnerByColumn } of relationKeys) {
        if (!isOwnerByColumn) {
          await relation.update(
            "addOrSet",
            entityKey.object,
            relationKey.object
          );
        }
        await emit(relation, relationKey.text);
      }

      return entityKey;

      async function emit(
        { relationMetadata, invert }: DataEntityRelation,
        newRelationKey: string
      ) {
        let entityTextKey = entityKey.text;

        if (invert) {
          [entityTextKey, newRelationKey] = [newRelationKey, entityTextKey];
        }

        await source.emitRelationChange?.({
          ...baseRelationChange,
          relationMetadata,
          newRelationKey,
          entityKey: entityTextKey,
        });

        relationMetadata.inverseRelation &&
          source.emitRelationChange?.({
            ...baseRelationChange,
            relationMetadata: relationMetadata.inverseRelation,
            entityKey: newRelationKey,
            newRelationKey: entityTextKey,
          });
      }
    },
  };
  function buildRelation(
    relation: DataEntityRelation,
    relationKey: DataEntityKey
  ) {
    if (!relationKey.object) {
      // dont build relation on insert when the key is null.
      return;
    }

    relationKeys.push({
      relation,
      relationKey,
      isOwnerByColumn: relation.setOwnerByColumn(row, relationKey),
    });
  }
};
