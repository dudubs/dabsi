import {Constructor} from "../common/typings";
import {DataExpTranslator} from "../json-exp/DataExpTranslator";
import {Query, QueryExp, QueryExpTypes} from "./QueryExp";

export type QueryExpTranslatorMethods<T> = {
    [K in keyof QueryExpTypes]: (
        exp: QueryExpTypes[K]
    ) => T
}
    ;
export type QueryExpTranslator<T> = {
    translateQueryCount(query: Query): T;

    translateQueryHas(inverse: boolean, query: Query): T;

    translateQuery(query: Query): T;
};

export abstract class AbstractQueryExpTranslator<T> extends DataExpTranslator<QueryExp, T>
    implements QueryExpTranslator<T> {
    abstract translateQueryCount(query: Query): T;

    abstract translateQueryHas(inverse: boolean, query: Query): T;

    abstract translateQuery(query: Query): T;

    $queryCount(exp: QueryExpTypes["$queryCount"]): T {
        return this.translateQueryCount(exp)
    }

    $queryHas(exp: QueryExpTypes["$queryHas"]): T {
        return this.translateQueryHas(false, exp)
    }

    $queryNotHas(exp: QueryExpTypes["$queryNotHas"]): T {
        return this.translateQueryHas(true, exp)
    }

    $query(exp: QueryExpTypes["$query"]): T {
        return this.translateQuery(exp);
    }


}

export function QueryExpTranslator<T>() {
    return (target: Constructor<QueryExpTranslator<T>>) => {
        const desc = Object.getOwnPropertyDescriptors(AbstractQueryExpTranslator.prototype);
        delete desc.constructor;
        Object.defineProperties(target.prototype, desc);
    }
}
