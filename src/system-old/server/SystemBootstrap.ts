const promises: Promise<any>[] = [];

export async function SystemBootstrap(promise?: Promise<any>) {
  if (promise) {
    promises.push(promise);
  } else {
    for (const promise of promises) {
      await promise;
    }
  }
}
