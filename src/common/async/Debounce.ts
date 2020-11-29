export function Debounce(ms: number) {
  let timeout: any = null;
  let counter = 0;
  return async () => {
    let id = ++counter;
    if (timeout) clearTimeout(timeout);
    await new Promise<void>(resolve =>
      setTimeout(() => {
        resolve();
      }, ms)
    );
    return id === counter;
  };
}
