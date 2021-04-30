import { RpcMemberHandler } from "@dabsi/typerpc2/RpcHandler";

export type RpcQueueRequest = {
  resolve(result: any);
  reject(error: any);
  payload: any[];
};

export type RpcMultiplexerHandler = (payloads: any[][]) => Promise<any[]>;

export class RpcMultiplexer {
  protected _tick: ReturnType<typeof setImmediate> | null = null;

  protected _waiters: RpcQueueRequest[] = [];

  constructor(protected handler: RpcMultiplexerHandler) {}

  send(payload: any[]): Promise<any> {
    if (this._tick === null) {
      this._tick = setImmediate(async () => {
        this._tick = null;
        const { _waiters } = this;
        this._waiters = [];

        const responses = await this.handler(
          _waiters.map(waiter => waiter.payload)
        );

        for (const [index, waiter] of _waiters.entries()) {
          waiter.resolve(responses[index]);
        }
      });
    }

    return new Promise((resolve, reject) => {
      this._waiters.push({ payload, resolve, reject });
    });
  }
}
