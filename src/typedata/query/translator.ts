import { Constructor } from "@dabsi/common/typings2/Constructor";
import { DataTranslator } from "@dabsi/typedata/exp/translator";
import {
  DataQuery,
  DataQueryExp,
  DataQueryExpTypes,
} from "@dabsi/typedata/query/exp";

export type DataQueryTranslator<T> = {
  translateCountQuery(query: DataQuery): T;

  translateHasQuery(inverse: boolean, query: DataQuery): T;

  translateQuery(query: DataQuery): T;

  translateJsonQuery(query: DataQuery): T;

  translateInQuery(
    inverse: boolean,
    left: DataQueryExp,
    right: DataQueryExp
  ): T;
};

type _Translator<T> = {
  [K in keyof DataQueryExpTypes]: (exp: DataQueryExpTypes[K]) => T;
};

export abstract class AbstractDataQueryTranslator<U>
  extends DataTranslator<U>
  implements DataQueryTranslator<U>, _Translator<U> {
  abstract translateCountQuery(query: DataQuery): U;

  abstract translateQueryFind(query: DataQuery): U;

  abstract translateHasQuery(inverse: boolean, query: DataQuery): U;

  abstract translateQuery(query: DataQuery): U;

  abstract translateJsonQuery(query: DataQuery): U;

  abstract translateInQuery(
    inverse: boolean,
    left: DataQueryExp,
    right: DataQueryExp
  ): U;

  $countQuery(exp: DataQueryExpTypes["$countQuery"]): U {
    return this.translateCountQuery(exp);
  }

  $queryHas(exp: DataQueryExpTypes["$queryHas"]): U {
    return this.translateHasQuery(false, exp);
  }

  $notHasQuery(exp: DataQueryExpTypes["$notHasQuery"]): U {
    return this.translateHasQuery(true, exp);
  }

  $query(exp: DataQueryExpTypes["$query"]): U {
    return this.translateQuery(exp);
  }

  $inQuery([left, right]: DataQueryExpTypes["$inQuery"]): U {
    return this.translateInQuery(false, left, right);
  }

  $notInQuery([left, right]: DataQueryExpTypes["$notInQuery"]): U {
    return this.translateInQuery(true, left, right);
  }

  $jsonQuery(query: DataQueryExpTypes["$jsonQuery"]): U {
    return this.translateJsonQuery(query);
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
