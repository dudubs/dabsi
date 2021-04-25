export default class RpcRequest {
  constructor(public payload: any[], public body: Record<string, any>) {}
}
