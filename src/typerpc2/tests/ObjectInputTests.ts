import { createRpc } from "@dabsi/typerpc2/createRpc";
import { createRpcHandler } from "@dabsi/typerpc2/createRpcHandler";
import { ObjectInput } from "@dabsi/typerpc2/object-input/rpc";
import { TextInput } from "@dabsi/typerpc2/text-input/rpc";
const R = ObjectInput({
  ti: TextInput,
});

it("", async () => {
  const h = await createRpcHandler(R, {});
  expect(await h.loadAndCheck({ ti: "hello" })).toEqual({
    value: { ti: "hello" },
  });
});

it("expect to error because input", async () => {
  const r = createRpc(R, {
    ti: { maxLength: 2 },
  });
  expect(await r.check({ ti: "hello" })).toEqual(
    jasmine.objectContaining({
      map: jasmine.objectContaining({
        ti: jasmine.any(String),
      }),
    })
  );
});
