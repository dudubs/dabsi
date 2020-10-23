import { ReactElement } from "react";
import { Timeout } from "../../../common/async/Timeout";
import { entries } from "../../../common/object/entries";
import { RpcConnection } from "../../Rpc";
import {
  AnyWidget,
  AnyWidgetConnection,
  WidgetElement,
} from "../../widget/Widget";
import { WidgetViewProps } from "../../widget/WidgetView";
import { WidgetViewClass } from "../tests/WidgetViewTester";
import { getTests, globalHooks, RpcTester } from "./testRpc";
import * as ReactTesterRenderer from "react-test-renderer";
export type WidgetTester<T extends AnyWidget> = {
  element: WidgetElement<T>;
};

export function testWidget<T extends AnyWidget>(
  t: RpcTester<T>,
  callback: (t: WidgetTester<T>) => void
) {
  let element;

  beforeAll(async () => {
    element = await t.connection.getElement();
  });

  callback({
    get element() {
      return element;
    },
  });
}

export type WidgetViewTester<
  T extends AnyWidget,
  VC extends WidgetViewClass<T>
> = {
  view: InstanceType<VC>;

  testRender(
    title: string,
    render: (
      viewClass: VC,
      props: WidgetViewProps<RpcConnection<T>>
    ) => ReactElement,
    callback?: () => void
  );
  testRender(
    render: (
      viewClass: VC,
      props: WidgetViewProps<RpcConnection<T>>
    ) => ReactElement
  );
};

export function testWidgetView<
  T extends AnyWidget,
  VC extends WidgetViewClass<T>
>(
  t: RpcTester<T>,
  viewClass: VC,
  callback: (tester: WidgetViewTester<T, VC>) => void
) {
  let view;

  let renders: {
    title;
    render(
      viewClass: WidgetViewClass<AnyWidget>,
      props: WidgetViewProps<AnyWidgetConnection> & { ref }
    );
    defineTests?();
  }[] = [];

  testWidget(t, wt => {
    const defineTests = getTests(
      "widgetView",
      () => {
        callback({
          get view() {
            return view;
          },
          testRender(...args) {
            if (args.length === 1) args = ["default", ...args];
            const [title, render, callback] = args;
            renders.push({
              title,
              render,
              defineTests: callback && getTests("render:" + title, callback),
            });
          },
        });
      },
      true
    );

    if (!renders.length) {
      console.warn(`No render cases for widget view ${viewClass.name}`);
      return;
    }

    for (const { title, render, defineTests: defineRenderTests } of renders) {
      describe(`render:${title}`, () => {
        beforeEach(async () => {
          ReactTesterRenderer.create(
            render(viewClass, {
              ref: current => {
                view = current;
              },
              element: wt.element,
              connection: t.connection,
            })
          );
          await Timeout(0);
        });
        afterEach(() => {
          view = undefined;
        });
        defineRenderTests?.();
        defineTests();
      });
    }
  });
}
