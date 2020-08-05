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
    translateCount(query: Query): T;

    translateHas(inverse: boolean, query: Query): T;

    translateQuery(query: Query): T;
};

export abstract class AbstractQueryExpTranslator<T> extends DataExpTranslator<QueryExp, T>
    implements QueryExpTranslator<T> {
    abstract translateCount(query: Query): T;

    abstract translateHas(inverse: boolean, query: Query): T;

    abstract translateQuery(query: Query): T;

    $count(exp: QueryExpTypes["$count"]): T {
        return this.translateCount(exp)
    }

    $has(exp: QueryExpTypes["$has"]): T {
        return this.translateHas(false, exp)
    }

    $notHas(exp: QueryExpTypes["$notHas"]): T {
        return this.translateHas(true, exp)
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
