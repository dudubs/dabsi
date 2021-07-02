import { createRpc } from "@dabsi/typerpc/createRpc";
import createRpcConfig from "@dabsi/typerpc/createRpcConfig";
import { createRpcHandler } from "@dabsi/typerpc/createRpcHandler";
import { Input, inputValueElementToData } from "@dabsi/typerpc/input/Input";
import {
  inputBaseConfig,
  InputHandler,
  InputWithConfig,
} from "@dabsi/typerpc/input/InputHandler";

class R extends Input<string, string, "ERR1" | "ERR2", { x? }> {
  [inputValueElementToData](element: string): string {
    throw new Error("Method not implemented.");
  }
}

interface R
  extends InputWithConfig<
    R,
    { cxs?: string } | undefined,
    string,
    {
      vcxs: string;
    }
  > {}

InputHandler(
  R,
  { configCanBeUndefined: false },
  {
    getElement() {
      return {};
    },
    getValueElement(value) {
      return value || "";
    },
    getValueFromConfig(config) {
      return config?.vcxs || this.config?.cxs || "";
    },
    loadAndCheck(data) {
      return { value: String(data || "") };
    },
  }
);

it("expect to load without error", async () => {
  expect(await (await createRpcHandler(R, {})).loadAndCheck("hello")).toEqual({
    value: "hello",
  });
});

it("expect to reject by custom check", async () => {
  expect(
    await (
      await createRpcHandler(R, {
        cxs: "asd",
        // config: { cxs: "" },
        [inputBaseConfig]: {
          check() {
            return "ERR1";
          },
        },
      })
    ).loadAndCheck("hello")
  ).toEqual({ error: "ERR1" });
});

it("expect input config", async () => {
  const config = await createRpcConfig(R, $ =>
    $({
      config: { cxs: "hello" },
      [inputBaseConfig]: {
        check: value => {},
      },
    })
  );

  expect(config![inputBaseConfig].check).toBeDefined();
});
