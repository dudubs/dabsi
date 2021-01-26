import { DataExp, DataExpType } from "./exp/exp";

export type DataFields<T> = Record<string, DataExp<T>>;

export type DataFieldsRow<T, Fields> = {
  [K in keyof Fields]: DataExpType<T, Fields[K]>;
};
