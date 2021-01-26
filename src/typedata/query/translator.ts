import { Constructor } from "@dabsi/common/typings2/Constructor";
import { DataTranslator } from "@dabsi/typedata/exp/translator";
import { DataQuery, DataQueryExpTypes } from "@dabsi/typedata/query/exp";

export type DataQueryTranslator<T> = {
  translateQueryCount(query: DataQuery): T;

  translateQueryHas(inverse: boolean, query: DataQuery): T;

  translateQuery(query: DataQuery): T;
};

type _Translator<T> = {
  [K in keyof DataQueryExpTypes]: (exp: DataQueryExpTypes[K]) => T;
};

export abstract class AbstractDataQueryTranslator<U>
  extends DataTranslator<U>
  implements DataQueryTranslator<U>, _Translator<U> {
  abstract translateQueryCount(query: DataQuery): U;

  abstract translateQueryFind(query: DataQuery): U;

  abstract translateQueryHas(inverse: boolean, query: DataQuery): U;

  abstract translateQuery(query: DataQuery): U;

  $queryCount(exp: DataQueryExpTypes["$queryCount"]): U {
    return this.translateQueryCount(exp);
  }

  $queryHas(exp: DataQueryExpTypes["$queryHas"]): U {
    return this.translateQueryHas(false, exp);
  }

  $queryNotHas(exp: DataQueryExpTypes["$queryNotHas"]): U {
    return this.translateQueryHas(true, exp);
  }

  $query(exp: DataQueryExpTypes["$query"]): U {
    return this.translateQuery(exp);
  }
}

export function DataQueryTranslator<T>() {
  return (target: Constructor<DataQueryTranslator<T>>) => {
    const desc: any = Object.getOwnPropertyDescriptors(
      AbstractDataQueryTranslator.prototype
    );
    delete desc.constructor;
    Object.defineProperties(target.prototype, desc);
  };
}
