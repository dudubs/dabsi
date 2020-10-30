import { ExpMap } from "../../common/typings";
import { DataOrder } from "../DataOrder";
import { DataExp } from "../data-exp/DataExp";

export type DataQueryJoinType = "LEFT" | "INNER";

export type DataQueryJoin = {
  from: string;
  type?: DataQueryJoinType;
  condition?: DataExp<any>;
};

export type QueryExpTypes = {
  $queryCount: DataQuery;

  $queryHas: DataQuery;

  $queryNotHas: DataQuery;

  $query: DataQuery;
};

export type DataQueryExp = ExpMap<QueryExpTypes> | DataExp<any>;

export type DataQuery = {
  from: string;

  alias: string;

  fields?: Record<string, DataExp<any>>;

  joins?: Record<string, DataQueryJoin>;

  where?: DataExp<any>;

  skip?: number;

  take?: number;

  order?: DataOrder<any>[];
};
