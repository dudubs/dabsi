import { testRpc } from "@dabsi/old-typerpc/RpcTester";
import { testInput } from "@dabsi/old-typerpc/input/InputTester";
import { EnumInput } from "@dabsi/old-typerpc/input/enum-input/EnumInput";
import objectContaining = jasmine.objectContaining;

testRpc(EnumInput(["k1", "k2"]), t => {
  it("expect to error because invalid key", async () => {
    expect(
      await t.handler.loadAndCheck(
        // @ts-ignore-error
        "x"
      )
    ).toEqual(objectContaining({ error: "INVALID_ENUM_KEY" }));
  });

  it("expect to success", async () => {
    expect(await t.handler.loadAndCheck("k1")).toEqual(
      objectContaining({
        value: "k1",
      })
    );
  });

  testInput(t, t => {
    t.testValue("k1", "k1");
    t.testError("kx", "INVALID_ENUM_KEY");
    t.testError(undefined, "NOT_NULLABLE");
    t.testError(null, "NOT_NULLABLE");
  });
});
