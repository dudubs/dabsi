export function assignAllDescriptors(...objects: object[]): object {
  const base = {};
  for (let object of objects) {
    Object.defineProperties(base, Object.getOwnPropertyDescriptors(object));
  }
  return base;
}
