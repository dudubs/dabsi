export type ArrayTypeOrObject<T> = T extends Array<infer U>
  ? U
  : Extract<T, object>;
