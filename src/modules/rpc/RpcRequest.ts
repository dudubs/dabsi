export default class RpcRequest {
  constructor(
    public path: any[],
    public payload: any,
    public body: Record<string, any>
  ) {}
}
