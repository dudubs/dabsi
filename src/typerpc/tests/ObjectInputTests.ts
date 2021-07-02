import { createRpc } from "@dabsi/typerpc/createRpc";
import { createRpcHandler } from "@dabsi/typerpc/createRpcHandler";
import { ObjectInput } from "@dabsi/typerpc/object-input/rpc";
import { TextInput } from "@dabsi/typerpc/text-input/rpc";
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
