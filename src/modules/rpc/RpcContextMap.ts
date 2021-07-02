import { ResolverMap } from "@dabsi/typedi";
import { RpcLocation } from "@dabsi/typerpc";

type Node = {};

export default class RpcContextMap {
  set(location: RpcLocation<any>, context: ResolverMap) {
    //
  }

  get(location: RpcLocation<any>) {}
}
