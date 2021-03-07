export function getOrdredKeys({
  firstKeys,
  lastKeys,
  excludeKeys,
  keys,
}: {
  keys: Set<string>;
  firstKeys?: string[];
  lastKeys?: string[];
  excludeKeys?: string[];
}) {
  const orderedKeys = new Set<string>();
  firstKeys?.forEach(key => isKey(key) && orderedKeys.add(key));
  keys.forEach(key => orderedKeys.add(key));
  lastKeys?.forEach(key => {
    if (isKey(key)) {
      orderedKeys.delete(key);
      orderedKeys.add(key);
    }
  });
  excludeKeys?.forEach(key => {
    orderedKeys.delete(key);
  });
  return [...orderedKeys];

  function isKey(key) {
    if (!keys.has(key)) {
      console.warn(`invalid key ${key}`);
      return false;
    }
    return true;
  }
}
