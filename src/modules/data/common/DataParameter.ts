import { Rpc, RpcMethod } from "@dabsi/typerpc";

export type DataParameter<T extends Rpc> = RpcMethod<[key: string], T>;
