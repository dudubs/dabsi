export function touchObject<T>(
  obj: Record<string, T>,
  key: string,
  callback: (key: string) => T
): T {
  let value = obj[key];
  if (value || key in obj) {
    return value;
  }
  value = obj[key] = callback(key);
  return value;
}
