import DataModule from "@dabsi/modules/data";
import { DataRelationChange } from "@dabsi/typedata/data-entity/DataEntityListener";
import { DataEntitySource } from "@dabsi/typedata/data-entity/DataEntitySource";
import { DataCursor } from "@dabsi/typedata/DataCursor";
import { DataSource } from "@dabsi/typedata/DataSource";
import { QueryRunner } from "typeorm";
import { RelationMetadata } from "typeorm/metadata/RelationMetadata";
import { DataEntityEmitter } from "../../typedata/data-entity/DataEntitySource";

export default class DataModuleSource<T> extends DataEntitySource<T> {
  constructor(
    protected module: DataModule,
    public getQueryRunner: () => QueryRunner,
    entityType: Function,
    cursor: DataCursor
  ) {
    super(entityType, getQueryRunner, cursor);
  }

  protected getEntityEmitter(entityType): DataEntityEmitter | undefined {
    return this.module.getEntityEmitter(entityType);
  }

  hasRelationListener(relationMetadata: RelationMetadata): boolean {
    return Boolean(
      this.module.relationListenerMap.get(relationMetadata)?.size ||
        (relationMetadata.inverseRelation &&
          this.module.relationListenerMap.get(relationMetadata.inverseRelation)
            ?.size)
    );
  }

  async emitRelationChange(change: DataRelationChange) {
    const queryRunner = this.getQueryRunner();
    const { relationMetadata } = change;

    const emit = async ({
      relationMetadata,
      inverse,
      newRelationKey,
      oldRelationKey,
      entityKey,
      reason,
    }: DataRelationChange) => {
      const emit = async (change: DataRelationChange) => {
        for (const calllback of this.module.relationListenerMap.get(
          relationMetadata
        ) || []) {
          await calllback({ change, queryRunner });
        }
      };

      if (inverse) {
        newRelationKey &&
          (await emit({
            reason,
            relationMetadata,
            inverse,
            newRelationKey: entityKey,
            oldRelationKey: null,
            entityKey: newRelationKey,
          }));

        oldRelationKey &&
          (await emit({
            reason,
            relationMetadata,
            inverse,
            newRelationKey: null,
            oldRelationKey: entityKey,
            entityKey: oldRelationKey,
          }));
      } else {
        await emit(change);
      }
    };

    await emit(change);

    relationMetadata.inverseRelation &&
      (await emit({
        ...change,
        relationMetadata: relationMetadata.inverseRelation,
        inverse: !change.inverse,
      }));
  }

  withCursor<U = T>(cursor: DataCursor): DataEntitySource<U> {
    return new DataModuleSource<U>(
      this.module,
      this.getQueryRunner,
      this.entityType,
      cursor
    );
  }
}
