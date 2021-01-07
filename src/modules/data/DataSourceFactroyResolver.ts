import { Type } from "@dabsi/common/typings2/Type";
import { DataSource } from "@dabsi/typedata/DataSource";
import { Resolver } from "@dabsi/typedi";

export type DataSourceFactory = <T>(entityType: Type<T>) => DataSource<T>;

export default Resolver<DataSourceFactory>("DataSourceFactory");
