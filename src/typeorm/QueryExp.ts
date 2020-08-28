import {Expression} from "../common/typings";
import {DataOrder} from "../data/DataOrder";
import {DataExp} from "../data/DataExp";

export type QueryJoinType = "LEFT" | "INNER";

export type QueryJoin = {
    from: string;
    type?: QueryJoinType;
    condition?: DataExp<any>
};



export type QueryExpTypes = {
    $queryCount: Query;

    $queryHas: Query;

    $queryNotHas: Query;

    $query: Query;
};

export type QueryExp =
    Expression<QueryExpTypes> | DataExp<any>;

export type Query = {

    from: string;

    as?:string;

    fields?: Record<string, DataExp<any>>;

    joins?: Record<string, QueryJoin>;

    where?: DataExp<any>;

    skip?: number;

    take?: number;

    order?: DataOrder<any>[];
};

