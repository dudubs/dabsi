import { ExpMap } from "@dabsi/common/typings2/ExpMap";
import { DataOrder } from "@dabsi/typedata/order";
import { DataExp, DataExpTypes } from "@dabsi/typedata/exp/exp";

export type DataQueryJoinType = "LEFT" | "INNER";

export type DataQueryJoin = {
  from: string;
  type: DataQueryJoinType;
  condition?: DataExp<any>;
  fields?: Record<string, DataExp<any>>;
};

export type DataQueryExpTypes = {
  $countQuery: DataQuery;

  $queryHas: DataQuery;

  $notHasQuery: DataQuery;

  $query: DataQuery;

  $jsonQuery: DataQuery;

  $inQuery: [any /* DataQueryExp*/, any /* DataQueryExp */];

  $notInQuery: [any /* DataQueryExp*/, any /* DataQueryExp */];
};

export type DataQueryExp = ExpMap<DataQueryExpTypes> | DataExp<any>;

export type DataQuery = {
  from: string;

  alias: string;

  with?: Record<
    string,
    {
      fields: string[];
      queries: DataQuery[];
    }
  >;

  // rename to fieldMap
  fields?: Record<string, DataExp<any>>;

  // rename to joinMap
  joins?: Record<string, DataQueryJoin>;

  schema?: string;

  where?: DataExp<any>;

  skip?: number;

  take?: number;

  order?: DataOrder<any>[];
};
