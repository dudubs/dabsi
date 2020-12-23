export default class SystemRequest {
  constructor(
    public path: any[],
    public payload: any,
    public body: Record<string, any>
  ) {}
}
