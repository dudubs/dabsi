import { Expression } from "../common/typings";
import { DataOrder } from "../typedata/DataOrder";
import { DataExp } from "../typedata/DataExp";

export type QueryJoinType = "LEFT" | "INNER";

export type QueryJoin = {
  from: string;
  type?: QueryJoinType;
  condition?: DataExp<any>;
};

export type QueryExpTypes = {
  $queryCount: DataQuery;

  $queryHas: DataQuery;

  $queryNotHas: DataQuery;

  $query: DataQuery;
};

export type DataQueryExp = Expression<QueryExpTypes> | DataExp<any>;

export type DataQuery = {
  from: string;

  as?: string;

  fields?: Record<string, DataExp<any>>;

  joins?: Record<string, QueryJoin>;

  where?: DataExp<any>;

  skip?: number;

  take?: number;

  order?: DataOrder<any>[];
};
