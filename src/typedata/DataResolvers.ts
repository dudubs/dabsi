import { Connection } from "typeorm";
import { mapObject } from "@dabsi/common/object/mapObject";
import { Type } from "@dabsi/common/typings2/Type";
import { Consumer } from "@dabsi/typedi/Consumer";
import { Resolver } from "@dabsi/typedi";
import { DataEntitySource } from "@dabsi/typedata/data-entity/DataEntitySource";
import { DataSource } from "@dabsi/typedata/DataSource";

export function DataResolvers<T extends Record<string, Type<any>>>(
  typeMap: T
): {
  [K in keyof T]: T[K] extends Type<infer U> ? Resolver<DataSource<U>> : never;
} {
  return mapObject(typeMap, type =>
    Consumer([Connection], connection =>
      DataEntitySource.create(type, connection)
    )
  ) as any;
}
