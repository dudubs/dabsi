import { ExpMap } from "../../common/typings2/ExpMap";
import { DataOrder } from "../DataOrder";
import { DataExp, DataExpTypes } from "../data-exp/DataExp";

export type DataQueryJoinType = "LEFT" | "INNER";

export type DataQueryJoin = {
  from: string;
  type?: DataQueryJoinType;
  condition?: DataExp<any>;
};

export type DataQueryExpTypes = DataExpTypes<any> & {
  $queryCount: DataQuery;

  $queryHas: DataQuery;

  $queryNotHas: DataQuery;

  $query: DataQuery;
};

export type DataQueryExp = ExpMap<DataQueryExpTypes> | DataExp<any>;

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
