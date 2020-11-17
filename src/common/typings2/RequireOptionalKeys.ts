export type RequireOptionalKeys<T> = {
  [K in keyof Required<T>]: T[K];
};
