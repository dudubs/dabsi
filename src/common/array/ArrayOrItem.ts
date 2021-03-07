export type ArrayOrItem<T> = T[] | T;
export function ArrayOrItem<T>(o: ArrayOrItem<T>): T[] {
  return Array.isArray(o) ? o : [o];
}
