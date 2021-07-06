import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { touchMap } from "@dabsi/common/map/touchMap";
import defined from "@dabsi/common/object/defined";
import { Connection, EntityMetadata } from "typeorm";
import { RelationMetadata } from "typeorm/metadata/RelationMetadata";

export const getEntityMetadataMaps = WeakMapFactory(
  (entityMetadatas: EntityMetadata[]) => {
    const entityMetadataMap = new Map<Function, EntityMetadata>();
    const relationMetadataMap = new Map<Function, RelationMetadata[]>();

    for (const entityMetadata of entityMetadatas) {
      if (typeof entityMetadata.target !== "function") continue;
      entityMetadataMap.set(entityMetadata.target, entityMetadata);
      for (const relationMetadata of entityMetadata.relations) {
        if (typeof relationMetadata.type !== "function") continue;
        if (!relationMetadata.isOwning) continue;

        touchMap(relationMetadataMap, relationMetadata.type, () => []).push(
          relationMetadata
        );
      }
    }

    return { entityMetadataMap, relationMetadataMap };
  }
);
export function getEntityMetadata(
  connection: Connection,
  entityType: Function
): EntityMetadata {
  return defined(
    getEntityMetadataMaps(connection.entityMetadatas).entityMetadataMap.get(
      entityType
    ),
    () => `No entity metadata for ${entityType.name}`
  );
}

export function getRelationMetadatasTo(
  connection: Connection,
  entityType: Function
): RelationMetadata[] {
  return (
    getEntityMetadataMaps(connection.entityMetadatas).relationMetadataMap.get(
      entityType
    ) || []
  );
}
