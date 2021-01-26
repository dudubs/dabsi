export default function globalTester(callback: () => void) {
  globalTester.callbacks.push(callback);
}

globalTester.callbacks = [] as (() => void)[];
