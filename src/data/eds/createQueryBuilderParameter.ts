import {QueryBuilder} from "typeorm";

let counter = 0;


export function createQbArrayParameter(qb: QueryBuilder<any>,
                                       value: any[],
                                       hint?: string) {
    const name = '_p' + (++counter) + (hint ? "_" + hint : "");
    qb.setParameter(name, value);
    return ':...' + name
}


export function createQbParameter(qb: QueryBuilder<any>, value: any,hint?:string) {
    const name = '_p' + (++counter)+ (hint ? "_" + hint : "");
    qb.setParameter(name, value);
    return ':' + name
}

