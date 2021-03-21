export function Tick(): Promise<void> {
  return new Promise(resolve => setImmediate(resolve));
}
