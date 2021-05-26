import { Rpc } from "@dabsi/typerpc2";

export type DataParameter<T extends Rpc> = (key: string) => T;
