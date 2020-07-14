import {QueryBuilder} from "typeorm";

let counter = 0;

export function createQueryBuilderParameter(qb: QueryBuilder<any>,
                                            value: any,
                                            isArray: boolean = false) {
    const name = '_p_' + (++counter);
    qb.setParameter(name, value);
    return (isArray ? ':...' : ':') + name
}

