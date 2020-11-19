import { Connection } from "typeorm";
import { mapObject } from "../common/object/mapObject";
import { Type } from "../common/typings2/Type";
import { Resolver } from "../typedi/Resolver";
import { DataEntitySource } from "./data-entity/DataEntitySource";
import { DataSource } from "./DataSource";

export function DataResolvers<T extends Record<string, Type<any>>>(
  typeMap: T
): {
  [K in keyof T]: T[K] extends Type<infer U> ? Resolver<DataSource<U>> : never;
} {
  return mapObject(typeMap, type =>
    Resolver.consume([Connection], connection =>
      DataEntitySource.create(type, connection)
    )
  ) as any;
}
