import { entries } from "@dabsi/common/object/entries";
import { DataEntityKey } from "@dabsi/typedata/entity/key";
import { DataEntitySource } from "@dabsi/typedata/entity/source";
import { DataInsertRow } from "@dabsi/typedata/value";
import { DataEntityRelation } from "@dabsi/typeorm/relations";

export default (source: DataEntitySource<any>, data: DataInsertRow<any>) => {
  const {
    entityCursor,
    entityCursor: { parent: parentEntityCursor, entityMetadata },
  } = source;

  const relations: {
    relation: DataEntityRelation;
    relationKey: DataEntityKey;
  }[] = [];

  const entity: any = entityCursor.entityManager.create(
    entityCursor.typeInfo.type
  );

  parentEntityCursor &&
    buildRelation(parentEntityCursor.relation, parentEntityCursor.relationKey);

  // build plan from cursor
  for (const { relation, key: relationKey } of entityCursor.relationKeys) {
    if (relation.propertyName in data) {
      throw new Error(`Can't override relation ${relation.propertyName}.`);
    }
    // build relation on insert.
    buildRelation(relation, relationKey);
  }

  // reject override column-keys by cursor
  for (const {
    metadata: { propertyName },
    key,
  } of entityCursor.columnKeys) {
    if (propertyName in data) {
      throw new Error(`Can't override field ${propertyName}.`);
    }
    entity[propertyName] = key;
  }

  // build plan from data
  for (let [propertyName, propertyValue] of entries(data)) {
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
      entityCursor.entityInfo.propertyColumnMetadataMap[propertyName];
    if (!column) throw new Error(`Invalid property ${propertyName}`);
    entity[propertyName] = propertyValue;
  }

  // set discriminator column if discriminator is also primary
  const {
    entityMetadata: { discriminatorColumn, discriminatorValue },
  } = entityCursor;
  if (discriminatorColumn?.isPrimary && discriminatorValue?.length) {
    entity[discriminatorColumn.propertyName] = discriminatorValue;
  }

  return {
    insert: async () => {
      await entityCursor.entityManager.save(entity);

      const entityKeyObject = DataEntityKey.pick(entityMetadata, entity);

      const entityKey: DataEntityKey = {
        text: DataEntityKey.stringify(
          entityCursor.entityMetadata,
          entityKeyObject
        ),
        object: entityKeyObject,
      };

      for (const { relation, relationKey } of relations) {
        await relation.update("addOrSet", entityKey.object, relationKey.object);
      }

      return entityKey;
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
    if (!relation.setEntityRow(entity, relationKey)) {
      relations.push({
        relation,
        relationKey,
      });
    }
  }
};
