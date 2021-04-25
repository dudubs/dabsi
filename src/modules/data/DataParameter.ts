import { Rpc } from "@dabsi/typerpc2";

export type DataParameter<T extends Rpc> = (dataKey: string) => T;
