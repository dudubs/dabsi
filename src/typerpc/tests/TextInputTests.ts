import { createRpcHandler } from "@dabsi/typerpc/createRpcHandler";
import { TextInput } from "@dabsi/typerpc/text-input/rpc";

it("expect to load text", async () => {
  expect(
    await (await createRpcHandler(TextInput, {})).loadAndCheck("hello")
  ).toEqual({ value: "hello" });
});

it("expect to error because min-length", async () => {
  expect(
    await (
      await createRpcHandler(TextInput, {
        minLength: 100,
      })
    ).loadAndCheck("hello")
  ).toEqual({ error: "TOO_SHORT" });
});

it("expect to error because max-length", async () => {
  expect(
    await (
      await createRpcHandler(TextInput, {
        maxLength: 2,
      })
    ).loadAndCheck("hello")
  ).toEqual({ error: "TOO_LONG" });
});

describe("view", () => {});
