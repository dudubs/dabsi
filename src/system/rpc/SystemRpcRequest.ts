export default class SystemRpcRequest {
  constructor(
    public path: any[],
    public payload: any,
    public body: Record<string, any>
  ) {}
}
