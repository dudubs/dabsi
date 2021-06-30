export default class RpcRequest {
  constructor(readonly payload: any[], readonly body: Record<string, any>) {}
}
