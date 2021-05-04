import { Constructor } from "@dabsi/common/typings2/Constructor";
import { DbQueryRunnerRef } from "@dabsi/modules2/DbModule2";
import { DataEntitySource } from "@dabsi/typedata/entity/source";
import { DataSource } from "@dabsi/typedata/source";
import { ConsumeResolver, Resolver } from "@dabsi/typedi";

export class DataSourceFactory2 extends Resolver(
  [DbQueryRunnerRef],
  getQueryRunner => <T>(entityType: Constructor<T>): DataSource<T> =>
    DataEntitySource.create(entityType, getQueryRunner)
) {}
