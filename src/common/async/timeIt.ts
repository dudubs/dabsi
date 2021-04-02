export async function timeIt<T>(
  getPromise: () => Promise<T>,
  callback: (time: number) => void
): Promise<T> {
  const startTime = new Date().getTime();
  try {
    return await getPromise();
  } finally {
    callback(new Date().getTime() - startTime);
  }
}
