import { Awaitable } from "@dabsi/common/typings2/Async";
import fs from "fs";
import path from "path";
export class AsyncJsonFile<T> {
  constructor(protected path: string) {}

  async write(value: T | null) {
    if (value === null) {
      await fs.promises.unlink(this.path).catch(() => null);
      return;
    }

    await fs.promises.writeFile(this.path, JSON.stringify(value));
  }

  async update(callback: (value: T | null) => Awaitable<T | null>) {
    const prevValue = await this.read();
    const nextValue = await callback(prevValue);
    if (nextValue !== prevValue) {
      await this.write(nextValue);
    }
  }

  read(): Promise<T | null> {
    return fs.promises
      .readFile(this.path, "utf8")
      .then(text => JSON.parse(text))
      .catch(() => null);
  }
}
