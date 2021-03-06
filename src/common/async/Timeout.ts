export type Timeout = ReturnType<typeof setTimeout>;
export function Timeout(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
