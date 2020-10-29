export class RpcRequest {
  protected handler = firstHandler => firstHandler();

  async handle<T>(callback: () => Promise<T>): Promise<T> {
    let result: T;
    await this.handler(async () => (result = await callback()));
    return result!;
  }

  push(nextHandler: (next: () => Promise<void>) => Promise<void>) {
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
