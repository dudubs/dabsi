export class RpcError extends Error {
  constructor(message: string, readonly payload?: any) {
    super(message);
  }
}
