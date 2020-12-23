import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { Type } from "@dabsi/common/typings2/Type";
import DataSystemModule from "./DataSystemModule";

export default function buildCountRefs<T, K extends ExtractKeys<T, number>>(
  dsm: DataSystemModule,
  relationType: Type<T>,
  relationPropertyName: string & K
) {
  dsm.buildRelation(relationType, ({ entityPropertyName, entityType }) => {
    // dsm.onInsert()
    const selection = { relations: { [entityPropertyName]: { pick: [] } } };

    dsm.listenToEntity(entityType, "insert", async event => {
      const change = event.changeMap[entityPropertyName];
      if (change?.type === "set") {
        await increment(change.key.object, 1);
      }
    });

    dsm.listenToEntity(entityType, "beforeUpdateAll", async event => {
      if (event.changeMap[entityPropertyName]) {
        event.select(selection);
      }
    });
    dsm.listenToEntity(entityType, "afterUpdateOne", async event => {
      const change = event.changeMap[entityPropertyName];
      const before = event.entity?.[entityPropertyName];
      if (!change) return;

      switch (change.type) {
        case "set":
          if (before?.$key === change.key.text) return;
          await increment(before?.$key, -1);
          await increment(change.key, 1);
          break;
        case "unset":
          await increment(before?.$key, -1);
          break;
      }
    });
    dsm.listenToEntity(entityType, "beforeDeleteAll", async event => {
      event.select(selection);
    });
    dsm.listenToEntity(entityType, "afterDeleteOne", async event => {
      const before = event.entity?.[entityPropertyName];
      await increment(before?.$key, -1);
    });
  });

  function increment(key, count: number) {
    if (key !== null)
      return dsm
        .getConnection()
        .manager.increment(relationType, key, relationPropertyName, count);
  }
}
