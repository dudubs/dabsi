import { pushHook } from "@dabsi/common/pushHook";
import RpcFuncational from "@dabsi/typerpc2/decorators/RpcFuncational";

export default function captureRpcPayload(callback: () => Promise<any>) {
  let payload = null as null | any[];

  const popHandler = pushHook(RpcFuncational, "handler", args => {
    if (payload) {
      throw new Error("Too many rpc-payloads to catch.");
    }
    [payload] = args;
    return Promise.reject<any>() as never;
  });

  try {
    callback();
  } finally {
    popHandler();
  }

  if (!payload) {
    throw new Error("No rpc-payload.");
  }
  return payload;
}
//

export type RpcCapturedCommand = {
  resolve(value: any);
  reject(error: any);
  payload: any[];
};
export function captureRpcCommand<T>(
  callback: () => Promise<T>
): [Promise<T>, RpcCapturedCommand] {
  let capturedCommand: RpcCapturedCommand | null = null;

  const popHandler = pushHook(RpcFuncational, "handler", ([payload]) => {
    return new Promise((resolve, reject) => {
      //
      capturedCommand = { resolve, reject, payload };
    });
  });

  let result: any = null;

  try {
    result = callback();
  } finally {
    popHandler();
  }

  if (!capturedCommand) {
    throw new Error(`No captured command.`);
  }
  return [result, capturedCommand];
}
