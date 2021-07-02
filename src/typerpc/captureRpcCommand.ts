import { pushHook } from "@dabsi/common/pushHook";
import RpcFuncational from "@dabsi/typerpc/decorators/RpcFuncational";

export type RpcCapturedCommand = {
  resolve(value: any);
  reject(error: any);
  payload: any[];
};
export default function captureRpcCommand<T>(
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
