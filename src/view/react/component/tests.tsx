import * as ReactTestRenderer from "react-test-renderer";
import { ViewConsumer } from "@dabsi/view/react/component/decorators/ViewConsumer";
import { View } from "@dabsi/view/react/component/View";
import React from "react";
import { Timeout } from "@dabsi/common/async/Timeout";
import EmptyFragment from "@dabsi/view/react/utils/EmptyFragment";
import { Tester } from "@dabsi/jasmine/Tester";

const t = Tester.beforeAll(async () => {
  class A extends View {
    @ViewConsumer(() => React.useMemo(() => "hello", []))
    consumedByHook!: string;

    @ViewConsumer(React.createContext("hello"))
    consumedByContext!: string;

    renderView() {
      return EmptyFragment;
    }
  }
  const a = await new Promise<A>(resolve => {
    ReactTestRenderer.create(
      <A
        ref={instance => {
          instance && resolve(instance);
        }}
      />
    );
  });
  return { a };
});
it("expect to consume by hook", () => {
  expect(t.a.consumedByHook).toEqual("hello");
});

it("expect to consume by context", () => {
  expect(t.a.consumedByContext).toEqual("hello");
});
