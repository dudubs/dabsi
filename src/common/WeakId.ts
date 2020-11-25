const ids = new WeakMap();
let counter = 0;

export function WeakId(o: object): number {
  return ids.get(o) ?? ids.set(o, ++counter).get(o);
}
