import { DataEntityKey } from "@dabsi/typedata/data-entity/DataEntityKey";
import { DataEntitySource } from "@dabsi/typedata/data-entity/DataEntitySource";

export default function (source: DataEntitySource<any>) {
  const { entityCursor } = source;
  const { entityMetadata } = entityCursor;

  return {
    deleteMany: async (keys: string[]) => {
      await entityCursor.entityManager.delete(
        entityCursor.typeInfo.type,
        entityMetadata.primaryColumns.length == 1
          ? keys
          : keys.map(
              textKey => DataEntityKey.parse(entityMetadata, textKey).object
            )
      );
    },
  };
}
