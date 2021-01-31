export function pick<T, K extends keyof T>(
  obj: T,
  ...args: K[] | K[][]
): Pick<T, K> {
  const out: any = {};
  for (const arg of args) {
    const keys = typeof arg === "object" ? arg : [arg];
    for (const key of keys) {
      out[key] = obj[key];
    }
  }
  return out;
}
