import { createRpc } from "@dabsi/typerpc/createRpc";
import { Widget } from "@dabsi/typerpc/widget/Widget";
import {
  WidgetHandler,
  WidgetWithConfig,
} from "@dabsi/typerpc/widget/WidgetHandler";

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
