import { createRpcConfigHandler } from "@dabsi/typerpc2/createRpcConfigHandler";
import { createRpcHandler } from "@dabsi/typerpc2/createRpcHandler";
import { ObjectInput } from "@dabsi/typerpc2/object-input/rpc";
import { TextInput } from "@dabsi/typerpc2/text-input/rpc";

it("", async () => {
  const R = ObjectInput({
    ti: TextInput,
  });

  const h = await createRpcHandler(R, {});
  console.log(await h.loadAndCheck({ ti: "hello" }));
});
