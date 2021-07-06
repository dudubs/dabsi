export type OneOrMany<T> = T[] | T;
export function OneOrMany<T>(o: OneOrMany<T>): T[] {
  return Array.isArray(o) ? o : [o];
}
