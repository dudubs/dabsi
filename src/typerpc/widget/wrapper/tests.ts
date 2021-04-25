import { type } from "@dabsi/common/typings2/Typing";
import { TextInput } from "@dabsi/old-typerpc/input/text-input/TextInput";
import { testRpc } from "@dabsi/old-typerpc/RpcTester";
import { Form } from "@dabsi/old-typerpc/widget/form/rpc";
import { WidgetWrapper } from "@dabsi/old-typerpc/widget/wrapper/rpc";
import { testWidget } from "@dabsi/old-typerpc/WidgetViewTester";

const w = WidgetWrapper({
  target: Form({
    input: TextInput(),
  }),
  element: type as {
    hello: string;
  },
});

testRpc(w, t => {
  t.testConfig({
    valueConfig: "hello-input",
    async submit() {},
    getWrapperElement: $ => $({ hello: "world" }),
  });
  testWidget(t, t => {
    it("expect to extra props", () => {
      expect(t.element.hello).toEqual("world");
    });
  });
});
