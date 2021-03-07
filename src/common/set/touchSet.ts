export function touchSet<T>(
  set: {
    has(value: T): boolean;
    add(value: T): void;
  },
  value: T
): boolean /* is touched */ {
  if (set.has(value)) {
    return false;
  }
  set.add(value);
  return true;
}
