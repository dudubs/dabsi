import { QueryRunner } from "typeorm";
import { DataEntityEmitter } from "./../../typedata/data-entity/DataEntitySource";
import SystemDataModule from "@dabsi/system/data";
import { DataEntitySource } from "@dabsi/typedata/data-entity/DataEntitySource";
import { DataCursor } from "@dabsi/typedata/DataCursor";

export default class DataSystemSource<T> extends DataEntitySource<T> {
  constructor(
    protected module: SystemDataModule,
    protected getQueryRunner: () => QueryRunner,
    entityType: Function,
    cursor: DataCursor
  ) {
    super(entityType, getQueryRunner, cursor);
  }

  protected getEntityEmitter(entityType): DataEntityEmitter | undefined {
    return this.module.getEntityEmitter(entityType);
  }

  withCursor<U = T>(cursor: DataCursor): DataEntitySource<U> {
    return new DataSystemSource(
      this.module,
      this.getQueryRunner,
      this.entityType,
      cursor
    );
  }
}
