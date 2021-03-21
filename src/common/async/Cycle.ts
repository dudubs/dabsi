export function Cycle(callback: () => void): () => void {
  let id: ReturnType<typeof setImmediate> | null = null;
  return () => {
    if (id === null) {
      id = setImmediate(() => {
        id = null;
        callback();
      });
    }
  };
}
