import { SYSTEM_RPC_PATH } from "@dabsi/system/core/common/rpc";
import { SystemCommand } from "@dabsi/system/core/common/command";

export default async function processRpcWithFormData<T>(
  buildFormData: (formData: FormData) => void,
  callback: () => Promise<T>
) {
  const formData = new FormData();

  buildFormData(formData);

  if (formData.has("command")) {
    throw new Error();
  }

  const [result, { path, payload, resolve }] = SystemCommand.capture(callback);

  formData.set("command", JSON.stringify({ path, payload }));

  resolve(
    await fetch(SYSTEM_RPC_PATH, {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(res => res.result)
  );

  return result;
}
