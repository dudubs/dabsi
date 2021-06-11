import { Union } from "@dabsi/common/typings2/Union";
declare global {
  interface GlobalMessageTypes {}
}
export type GlobalMessage = Union<
  {
    [K in keyof GlobalMessageTypes]: { type: K } & GlobalMessageTypes[K];
  }
>;

export default ((globalThis as any)["GLOBAL_MESSAGES"] ||
  []) as readonly GlobalMessage[];
