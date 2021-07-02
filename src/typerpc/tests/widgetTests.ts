import { createRpc } from "@dabsi/typerpc2/createRpc";
import { Widget } from "@dabsi/typerpc2/widget/Widget";
import {
  WidgetHandler,
  WidgetWithConfig,
} from "@dabsi/typerpc2/widget/WidgetHandler";

it("expect to widget element", async () => {
  class R extends Widget<{ exs: string }> {}

  interface R extends WidgetWithConfig<R, { cxs: string }> {}

  WidgetHandler(
    R,
    {},
    {
      getElement() {
        return { exs: this.config.cxs };
      },
    }
  );

  expect((await createRpc(R, { cxs: "hello" }).getElement()).exs).toEqual(
    "hello"
  );
});
