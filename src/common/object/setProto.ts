export function setProto<T extends object, U extends object>(
  base: T,
  child: U
): Omit<T, keyof U> & U {
  return Object.setPrototypeOf(child, base);
}
