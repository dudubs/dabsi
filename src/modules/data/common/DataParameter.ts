import { Rpc, RpcMethod } from "@dabsi/typerpc2";

export type DataParameter<T extends Rpc> = RpcMethod<[key: string], T>;
