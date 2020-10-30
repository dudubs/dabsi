import { Constructor } from "../../common/typings";
import { DataExpTranslator } from "../data-exp/DataExpTranslator";
import { DataQuery, DataQueryExp, QueryExpTypes } from "./DataQueryExp";

export type DataQueryExpTranslator<T> = {
  translateQueryCount(query: DataQuery): T;

  translateQueryHas(inverse: boolean, query: DataQuery): T;

  translateQuery(query: DataQuery): T;
};

export abstract class AbstractDataQueryExpTranslator<T>
  extends DataExpTranslator<DataQueryExp, T>
  implements DataQueryExpTranslator<T> {
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

export function DataQueryExpTranslator<T>() {
  return (target: Constructor<DataQueryExpTranslator<T>>) => {
    const desc: any = Object.getOwnPropertyDescriptors(
      AbstractDataQueryExpTranslator.prototype
    );
    delete desc.constructor;
    Object.defineProperties(target.prototype, desc);
  };
}
