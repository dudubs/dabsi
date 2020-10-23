type Capitalize<T> = string;

export function capitalize<T extends string>(key: T): Capitalize<T> {
  return key.charAt(0).toUpperCase() + key.slice(1);
}
