export function* objectBases(o) {
  while (o) {
    yield o;
    o = Object.getPrototypeOf(o);
  }
}
