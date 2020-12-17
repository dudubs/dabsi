import { Connection } from "typeorm";
import { mapObject } from "@dabsi/common/object/mapObject";
import { Type } from "@dabsi/common/typings2/Type";
import { Consumer } from "@dabsi/typedi/Consumer";
import { CustomResolver } from "@dabsi/typedi/Resolver";
import { DataEntitySource } from "@dabsi/typedata/data-entity/DataEntitySource";
import { DataSource } from "@dabsi/typedata/DataSource";

export function DataSources<T extends Record<string, Type<any>>>(
  typeMap: T
): CustomResolver<
  {
    [K in keyof T]: T[K] extends Type<infer U> ? DataSource<U> : never;
  }
> {
  return Consumer(
    [Connection],
    connection =>
      <any>mapObject(typeMap, type => DataEntitySource.create(type, connection))
  );
}
