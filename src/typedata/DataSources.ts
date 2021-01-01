import { mapObject } from "@dabsi/common/object/mapObject";
import { Type } from "@dabsi/common/typings2/Type";
import DataSourceResolver from "@dabsi/typedata/data-entity/DataSourceResolver";
import { DataSource } from "@dabsi/typedata/DataSource";
import { CustomResolver, Resolver } from "@dabsi/typedi";

//
export default function DataSources<T extends Record<string, Type<any>>>(
  typeMap: T
): CustomResolver<
  {
    [K in keyof T]: T[K] extends Type<infer U> ? DataSource<U> : never;
  }
> {
  return Resolver.consume(
    { getDataSource: DataSourceResolver },
    c => <any>mapObject(typeMap, type => c.getDataSource(type))
  );
}
