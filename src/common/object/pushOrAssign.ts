export function pushOrAssign<T>(
  a: T,
  k: keyof T,
  ...ba: (T | null | undefined)[]
);

export function pushOrAssign(a, k, ...ba) {
  const ak: any = a[k];
  if (Array.isArray(ak)) {
    for (const b of ba) {
      b[k] && ak.push(...b[k]);
    }
    return;
  }

  Object.assign(ak, ...ba.map(b => b?.[k]));
}
