import { Type } from "@dabsi/common/typings2/Type";
import { DataSource } from "@dabsi/typedata/source";
import { Resolver } from "@dabsi/typedi";

export default Resolver<<T>(entityType: Type<T>) => DataSource<T>>(
  "DataSourceFactory"
);
