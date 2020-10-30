import { DataExp } from "./data-exp/DataExp";

export type DataSort = "ASC" | "DESC";
export type DataNullsSort = "FIRST" | "LAST";
export const DataSort: Record<DataSort, DataSort> = {
  ASC: "ASC",
  DESC: "DESC",
};
export const DataNullsSort: Record<DataNullsSort, DataNullsSort> = {
  FIRST: "FIRST",
  LAST: "LAST",
};

export type DataOrder<T> = {
  by: DataExp<T>;
  sort: DataSort;
  nulls?: DataNullsSort;
};
