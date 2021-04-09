import { Awaitable } from "../common/typings2/Async";

export class Request {
  readonly cleaners: (() => Awaitable)[] = [];
}
