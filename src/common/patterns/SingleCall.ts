export function SingleCall<T>(callback: () => T): () => T {
  let called = false;
  let result;
  return () => {
    if (called) return result;
    called = true;
    return (result = callback());
  };
}
