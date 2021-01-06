import { SystemRpcPath } from "@dabsi/system/core/common/SystemRpc";
import SystemCommand from "@dabsi/system/core/view/SystemCommand";

export default async function processRpcWithFormData<T>(
  buildFormData: (formData: FormData) => void,
  callback: () => Promise<T>
) {
  const formData = new FormData();

  buildFormData(formData);

  if (formData.has("command")) {
    throw new Error();
  }

  const {
    result,
    command: { path, payload, resolve },
  } = SystemCommand.capture(callback);

  formData.set("command", JSON.stringify({ path, payload }));

  resolve(
    await fetch(SystemRpcPath, {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(res => res.result)
  );

  return result;
}
