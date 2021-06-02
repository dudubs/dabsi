export type RpcCommandRequest = {
  path: any[];
  payload: any;
  resolve(result: any);
};

export type RpcMultiplexerHandler = (requests: RpcCommandRequest[]) => void;

export class RpcMultiplexer {
  constructor(protected handler: (requests: RpcCommandRequest[]) => void) {}

  protected _requests: RpcCommandRequest[] = [];

  protected _tick: ReturnType<typeof setImmediate> | null = null;

  send(path: any, payload: any) {
    if (this._tick === null) {
      this._tick = setImmediate(() => {
        this._tick = null;
        const { _requests } = this;
        this._requests = [];
        this.handler(_requests);
      });
    }

    return new Promise(resolve => {
      this._requests.push({ path, payload, resolve });
    });
  }
}
