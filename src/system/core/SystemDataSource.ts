import DataSystemModule from "@dabsi/system/core/DataSystemModule";
import { DataEntitySource } from "@dabsi/typedata/data-entity/DataEntitySource";
import { DataCursor } from "./../../typedata/DataCursor";

export default class DataSystemSource<T> extends DataEntitySource<T> {
  constructor(
    protected module: DataSystemModule,
    entityType: Function,
    cursor: DataCursor
  ) {
    super(entityType, () => this.module.getConnection(), cursor);
  }

  withCursor<U = T>(cursor: DataCursor): DataEntitySource<U> {
    return new DataSystemSource(this.module, this.entityType, cursor);
  }
}
