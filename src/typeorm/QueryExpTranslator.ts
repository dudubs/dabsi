import { Constructor } from "../common/typings";
import { DataExpTranslator } from "../typedata/DataExpTranslator";
import { DataQuery, DataQueryExp, QueryExpTypes } from "./DataQueryExp";

export type QueryExpTranslatorMethods<T> = {
  [K in keyof QueryExpTypes]: (exp: QueryExpTypes[K]) => T;
};
export type QueryExpTranslator<T> = {
  translateQueryCount(query: DataQuery): T;

  translateQueryHas(inverse: boolean, query: DataQuery): T;

  translateQuery(query: DataQuery): T;
};

export abstract class AbstractQueryExpTranslator<T>
  extends DataExpTranslator<DataQueryExp, T>
  implements QueryExpTranslator<T> {
  abstract translateQueryCount(query: DataQuery): T;

  abstract translateQueryHas(inverse: boolean, query: DataQuery): T;

  abstract translateQuery(query: DataQuery): T;

  $queryCount(exp: QueryExpTypes["$queryCount"]): T {
    return this.translateQueryCount(exp);
  }

  $queryHas(exp: QueryExpTypes["$queryHas"]): T {
    return this.translateQueryHas(false, exp);
  }

  $queryNotHas(exp: QueryExpTypes["$queryNotHas"]): T {
    return this.translateQueryHas(true, exp);
  }

  $query(exp: QueryExpTypes["$query"]): T {
    return this.translateQuery(exp);
  }
}

export function QueryExpTranslator<T>() {
  return (target: Constructor<QueryExpTranslator<T>>) => {
    const desc: any = Object.getOwnPropertyDescriptors(
      AbstractQueryExpTranslator.prototype
    );
    delete desc.constructor;
    Object.defineProperties(target.prototype, desc);
  };
}
