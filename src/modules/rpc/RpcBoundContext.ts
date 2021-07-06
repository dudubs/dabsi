import { ResolverMap } from "@dabsi/typedi";
import { RpcLocation } from "@dabsi/typerpc";

export default class RpcBoundContext {
  constructor(
    readonly location: RpcLocation<any>,
    readonly context: ResolverMap
  ) {}
}
