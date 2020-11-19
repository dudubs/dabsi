import { ComponentProps, createElement, ReactElement } from "react";
import * as ReactTesterRenderer from "react-test-renderer";
import { Timeout } from "../common/async/Timeout";
import { buildTests } from "../jasmine/buildTests";
import { RpcConnection } from "./Rpc";
import { WidgetViewClass } from "./widget/AbstractWidgetView";
import { AnyWidget, AnyWidgetConnection, WidgetElement } from "./widget/Widget";
import { WidgetViewProps } from "./widget/WidgetView";
import { RpcTester } from "./RpcTester";

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

  testProps(
    title: string,
    props: Omit<ComponentProps<VC>, keyof WidgetViewProps<RpcConnection<T>>>,
    callback?: () => void
  );
  testProps(
    props: Omit<ComponentProps<VC>, keyof WidgetViewProps<RpcConnection<T>>>,
    callback?: () => void
  );

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
    ) => ReactElement,
    callback?: () => void
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
    const defineTests = buildTests("widgetView", () => {
      callback({
        get view() {
          return view;
        },
        testProps(...args) {
          if (args.length === 2) {
            args = ["default", ...args];
          }
          const [title, props, callback] = args;
          this.testRender(
            title,
            (View, viewProps) =>
              createElement(View, { ...viewProps, ...props }),
            callback
          );
        },
        testRender(...args) {
          if (args.length === 1) args = ["default", ...args];
          const [title, render, callback] = args;
          renders.push({
            title,
            render,
            defineTests: callback && buildTests("render:" + title, callback),
          });
        },
      });
    });

    if (!renders.length) {
      console.warn(`--- No render cases for widget view ${viewClass.name}`);
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
              elementState: undefined,
              onElementStateChange: undefined,
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
