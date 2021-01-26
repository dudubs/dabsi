import { hasKeys } from "@dabsi/common/object/hasKeys";
import { inspect } from "@dabsi/logging/inspect";
import { DataEntityKey } from "@dabsi/typedata/data-entity/DataEntityKey";
import { DataChangeReason } from "@dabsi/typedata/data-entity/DataEntityListener";
import { DataEntitySource } from "@dabsi/typedata/data-entity/DataEntitySource";
import deleteEntityRow from "@dabsi/typedata/data-entity/sql/deleteEntityRow";
import { DataUnion } from "@dabsi/typedata/DataUnion";
import { EntityMetadata } from "typeorm";

export default function (source: DataEntitySource<any>) {
  const { entityCursor } = source;
  const { typeInfo, entityMetadata, connection } = entityCursor;

  const selectionChildren = {};

  const selection: any = {
    pick: [],
  };

  const unionChildren = {};

  buildEntity(entityMetadata);
  entityMetadata.childEntityMetadatas.forEach(buildEntity);

  if (!unionChildren) {
    selectEntity(selection, entityMetadata);
  } else {
    if (hasKeys(selectionChildren)) {
      selection.children = selectionChildren;
    }
  }

  const rowType = unionChildren
    ? DataUnion(typeInfo.type as any, { children: unionChildren })
    : typeInfo.type;

  let entityRowMap: Record<string, any>;

  return {
    deleteMany: async (keys: string[]) => {
      for (const key of keys) {
        await deleteKey(key);
      }
    },
  };

  function selectEntity(selection, entityMetadata: EntityMetadata) {
    const selectionRelations: any = {};
    for (const relationMetadata of entityMetadata.relations) {
      if (!source.hasRelationListener(relationMetadata)) return;
      const isToOne =
        relationMetadata.isManyToOne || relationMetadata.isOneToOne;

      if (isToOne) {
        selectionRelations[relationMetadata.propertyName] = { pick: [] };
      } else {
      }
    }
    if (hasKeys(selectionRelations)) {
      selection.relations = selectionRelations;
    }
  }

  function buildEntity(entityMetadata: EntityMetadata) {
    const { discriminatorValue: childKey, target } = entityMetadata;
    if (typeof target !== "function") return;

    if (childKey) {
      unionChildren[childKey] = target;
      const childSelection: any = {};

      selectEntity(childSelection, entityMetadata);
      if (hasKeys(childSelection)) {
        selectionChildren[childKey] = childSelection;
      }
    } else {
      selectEntity(selection, entityMetadata);
    }
  }

  function loadEntityMap(keys: string[]) {
    if (!hasKeys(selection) && !hasKeys(unionChildren)) return {};
    console.log(inspect({ rowType, selection }));

    return (
      source
        .createEntitySource(rowType)
        // .select(selection)
        .filter({ $is: keys })
        .getRowMap()
    );
  }

  async function deleteKey(entityTextKey: string) {
    const entityKey = DataEntityKey.parse(
      entityCursor.entityMetadata,
      entityTextKey
    );

    // before

    for (const rm of connection.entityMetadatas
      .toSeq()
      .flatMap(em => em.relations)
      .filter(rm => rm.type === entityMetadata.target)
      .filter(rm => rm.isOwning)) {
      const oldRelationTextKeys = await source
        .createEntitySource(rm.target)
        .of(rm.propertyName as never, entityKey.text)
        .getKeys();

      for (const oldRelationKey of oldRelationTextKeys) {
        await source.emitRelationChange?.({
          reason: DataChangeReason.DELETE,
          entityKey: oldRelationKey,
          oldRelationKey: entityTextKey,
          newRelationKey: null,
          relationMetadata: rm,
        });
        rm.inverseRelation &&
          (await source.emitRelationChange?.({
            reason: DataChangeReason.DELETE,
            entityKey: entityTextKey,
            oldRelationKey: oldRelationKey,
            newRelationKey: null,
            relationMetadata: rm.inverseRelation,
          }));
      }
    }
    for (const relationMetadata of entityMetadata.relations) {
      if (!relationMetadata.isOwning) continue;
      const oldRelationTextKeys = await source
        .at(relationMetadata.propertyName as never, entityTextKey)
        .getKeys();

      for (const oldRelationKey of oldRelationTextKeys) {
        await source.emitRelationChange?.({
          reason: DataChangeReason.DELETE,
          entityKey: entityTextKey,
          oldRelationKey,
          newRelationKey: null,
          relationMetadata,
        });
        relationMetadata.inverseRelation &&
          (await source.emitRelationChange?.({
            reason: DataChangeReason.DELETE,
            entityKey: oldRelationKey,
            oldRelationKey: entityTextKey,
            newRelationKey: null,
            relationMetadata: relationMetadata.inverseRelation,
          }));
      }
    }

    await deleteEntityRow(
      source.getQueryRunner(),
      entityCursor.typeInfo.type,
      entityKey
    );

    // after
    // for (const relationMetadata of entityInfo.relationsToOne) {
    //   const relationKey = entityRow?.[relationMetadata.propertyName]?.$key;
    //   if (!relationKey) continue;

    //   await source.emitRelationChange?.({
    //     relationMetadata,
    //     reason: DataChangeReason.DELETE,
    //     oldRelationKey: relationKey,
    //     newRelationKey: null,
    //     entityKey: entityTextKey,
    //   });
    // }

    // for (const relationMetadata of entityInfo.relationsToMany) {
    //   const oldRelationKeys = await new DataEntitySource(
    //     relationMetadata.target as Function,
    //     source.getQueryRunner,
    //     EmptyDataCursor
    //   )
    //     .at(relationMetadata.propertyName as never, entityTextKey)
    //     .select({ pick: [] })
    //     .getKeys();

    //   for (const oldRelationKey of oldRelationKeys) {
    //     await source.emitRelationChange?.({
    //       oldRelationKey,
    //       newRelationKey: null,
    //       reason: DataChangeReason.DELETE,
    //       relationMetadata,
    //       entityKey: entityTextKey,
    //     });
    //   }
    // }
  }
}
