export type And<T extends boolean, U extends boolean> = T extends true
  ? U extends true
    ? true
    : false
  : false;
