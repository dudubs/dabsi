import { Connection } from "typeorm";
import { mapObject } from "../common/object/mapObject";
import { Type } from "../common/typings2/Type";
import { Consumer } from "../typedi/Consumer";
import { CustomResolver } from "../typedi/Resolver";
import { DataEntitySource } from "./data-entity/DataEntitySource";
import { DataSource } from "./DataSource";

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
