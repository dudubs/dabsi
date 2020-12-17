import { touchMap } from "@dabsi/common/map/touchMap";

export class RpcRequest {
  protected handler = firstHandler => firstHandler();

  async handle<T>(callback: () => Promise<T>): Promise<T> {
    let result: T;
    await this.handler(async () => (result = await callback()));
    return result!;
  }

  protected cacheMap = new Map<any, any>();

  init<T>(id, callback: () => T): T {
    return touchMap(this.cacheMap, id, () => callback());
  }

  push(nextHandler: (next: () => Promise<void>) => any) {
    const prevHandler = this.handler;
    this.handler = async firstHandler => {
      let nextIsCalled = false;
      await nextHandler(async () => {
        if (nextIsCalled) {
          throw new Error(`Too many calls to next handler`);
        }
        nextIsCalled = true;
        await prevHandler(firstHandler);
      });

      if (!nextIsCalled) {
        await prevHandler(firstHandler);
      }
    };
  }
}
