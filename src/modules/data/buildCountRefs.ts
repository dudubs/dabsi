import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { Type } from "@dabsi/common/typings2/Type";
import DataModule from "@dabsi/modules/data";
import { EntityManager } from "typeorm";
import { DataEntityKey } from "../../typedata/data-entity/DataEntityKey";

export default function buildCountRefs<T, K extends ExtractKeys<T, number>>(
  dataModule: DataModule,
  countedEntityType: Type<T>,
  countedEntityPropertyName: string & K
) {
  dataModule.buildRelationsTo(countedEntityType, relationMetadata => {
    const countedEntityMetdata = relationMetadata.entityMetadata.connection.getMetadata(
      countedEntityType
    );

    function increment(manager: EntityManager, textKey: string, count: number) {
      return manager.increment(
        countedEntityType,
        DataEntityKey.parse(countedEntityMetdata, textKey),
        countedEntityPropertyName,
        count
      );
    }

    dataModule.onRelationChange(
      relationMetadata,
      async ({ change, queryRunner }) => {
        change.newRelationKey &&
          (await increment(queryRunner.manager, change.newRelationKey, 1));

        change.oldRelationKey &&
          (await increment(queryRunner.manager, change.oldRelationKey, -1));
      }
    );

    // dataModule.listen(relation.entityType, {
    //   insert: async event => {
    //     const change = event.changeMap[relation.propertyName];
    //     if (change?.isRelation) {
    //       await increment(event.manager, change.relationKey, 1);
    //     }
    //   },
    //   beforeUpdateAll: event => {
    //     if (
    //       relation.isToOne &&
    //       event.changeMap[relation.propertyName]?.isRelation
    //     ) {
    //       event.select(relationSelection);
    //     }
    //   },
    //   afterUpdateOne: async event => {
    //     const change = event.changeMap[relation.propertyName];
    //     if (!change?.isRelation) return;
    //     if (change.type === "set") {
    //       if (getPrevRelationTextKey(event) === change.relationKey.text) return;
    //       await increment(event.manager, change.relationKey, 1);
    //     }
    //     await decrement(event);
    //   },
    //   beforeDeleteAll: async event => {
    //     if (relation.isToOne) {
    //       event.select(relationSelection);
    //     }
    //   },
    //   beforeDeleteOne: async event => {
    //     if (relation.isToOne) {
    //       await decrement(event);
    //     } else {
    //       const textKeys = await DataEntitySource.createFromConnection(
    //         relation.entityType,
    //         () => connection
    //       )
    //         .at(relation.propertyName as never, event.entityKey.text)
    //         .getKeys();

    //       for (const textKey of textKeys) {
    //         const key = DataEntityKey.parse(
    //           relation.right.entityMetadata,
    //           textKey
    //         );
    //         await increment(event.manager, key, -1);
    //       }
    //     }
    //   },
    //   relation: async event => {
    //     if (event.relation.propertyName !== relation.propertyName) return;
    //     return increment(
    //       event.manager,
    //       event.relationKey,
    //       event.method === "addOrSet" ? 1 : -1
    //     );
    //   },
    // });
  });
}
