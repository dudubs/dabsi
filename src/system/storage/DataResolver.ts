import { Type } from "@dabsi/common/typings2/Type";
import DataSourceFactroyResolver, {
  DataSourceFactory,
} from "@dabsi/modules/data/DataSourceFactroyResolver";
import { DataRow } from "@dabsi/typedata/DataRow";
import {
  AnyResolverMap,
  Inject,
  Injectable,
  Resolver,
  ResolverType,
} from "@dabsi/typedi";
import { getTypeToken } from "@dabsi/typedi/getTypeToken";

@Injectable()
export class DataResolver {
  constructor(
    @Inject(DataSourceFactroyResolver)
    public getSource: DataSourceFactory,
    @Inject(c => c)
    protected context: AnyResolverMap
  ) {}

  getRow<T>(type: Type<T>): DataRow<T> | undefined {
    const typeToken = getTypeToken(type);
    const resolver = this.context[typeToken];
    if (resolver) {
      return Resolver.resolve(resolver, this.context);
    }
  }
}
