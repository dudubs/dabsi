export type Or<T extends boolean, U extends boolean> = T extends true
  ? true
  : U extends true
  ? true
  : false;
