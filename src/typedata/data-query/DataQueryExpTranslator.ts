import { Constructor } from "@dabsi/common/typings2/Constructor";
import { DataExpTranslator } from "@dabsi/typedata/data-exp/DataExpTranslator";
import { DataQuery, DataQueryExp, DataQueryExpTypes } from "@dabsi/typedata/data-query/DataQueryExp";

export type DataQueryExpTranslator<T> = {
  translateQueryCount(query: DataQuery): T;

  translateQueryHas(inverse: boolean, query: DataQuery): T;

  translateQuery(query: DataQuery): T;
};

export abstract class AbstractDataQueryExpTranslator<U>
  extends DataExpTranslator<U>
  implements DataQueryExpTranslator<U> {
  abstract translateQueryCount(query: DataQuery): U;

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

export function DataQueryExpTranslator<T>() {
  return (target: Constructor<DataQueryExpTranslator<T>>) => {
    const desc: any = Object.getOwnPropertyDescriptors(
      AbstractDataQueryExpTranslator.prototype
    );
    delete desc.constructor;
    Object.defineProperties(target.prototype, desc);
  };
}
