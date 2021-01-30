import { ExpMap } from "@dabsi/common/typings2/ExpMap";
import { DataOrder } from "@dabsi/typedata/order";
import { DataExp, DataExpTypes } from "@dabsi/typedata/exp/exp";

export type DataQueryJoinType = "LEFT" | "INNER";

export type DataQueryJoin = {
  from: string;
  type?: DataQueryJoinType;
  condition?: DataExp<any>;
  fields?: Record<string, DataExp<any>>;
};

export type DataQueryExpTypes = {
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
