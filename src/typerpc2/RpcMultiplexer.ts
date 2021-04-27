import { resolve } from "node:path";

export type RpcQueueRequest = {
  resolve(result: any);
  reject(error: any);
  payload: any[];
};

export type RpcQueueHandler = (waiters: RpcQueueRequest[]) => void;

export class RpcMultiplexer {
  protected _tick: ReturnType<typeof setImmediate> | null = null;

  protected _waiters: RpcQueueRequest[] = [];

  constructor(protected handler: RpcQueueHandler) {
    //
  }

  send(payload: any[]): Promise<any> {
    if (this._tick === null) {
      this._tick = setImmediate(() => {
        this._tick = null;
        const { _waiters } = this;
        this._waiters = [];
        this.handler(_waiters);
      });
    }
    return new Promise((resolve, reject) => {
      this._waiters.push({ payload, resolve, reject });
    });
  }
}
