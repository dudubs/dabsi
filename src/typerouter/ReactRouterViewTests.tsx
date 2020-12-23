import { createMemoryHistory } from "history";
import React from "react";

import ReactTesterRenderer from "react-test-renderer";
import { Timeout } from "@dabsi/common/async/Timeout";
import { Emitter, useEmitter } from "@dabsi/react/reactor/useEmitter";
import { ReactRouter } from "@dabsi/typerouter/ReactRouter";
import ReactRouterView from "@dabsi/typerouter/ReactRouterView";
import { Router, RouterType } from "@dabsi/typerouter/Router";
import { RouterEvent } from "@dabsi/typerouter/RouterEvent";
import {
  AnyRouterLocation,
  RouterLocation,
} from "@dabsi/typerouter/RouterLocation";
import { HistoryProvider } from "@dabsi/typerouter/History";

export const TestRouter = Router({
  a: Router({
    aa: Router({ aaa: Router(), aab: Router() }),
    ab: Router({ aba: Router(), abb: Router() }),
  }),
  hello: Router(["name"], {
    logout: Router(),
  }),
});

TestRouter.at("a", r => {
  ReactRouterView(r, { wrap: ({ children }) => <>A{children}</> });
  r.at("aa", r => {
    ReactRouterView(r, {
      wrap: ({ children }) => <>/AA{children}</>,
      renderIndex: () => <>index</>,
      renderDefault: p => <>default {p.route.defaultPath}</>,
    });
    ReactRouterView(r.at("aaa"), () => <>/AAA</>);
    ReactRouterView(r.at("aab"), () => <>/AAB</>);
  });
}).at("hello", r => {
  ReactRouterView(r, {
    wrap: p => {
      // @ts-expect-error
      p.location.params.x;
      return (
        <>
          Hello {p.location.params.name}! {p.children}
        </>
      );
    },
    renderIndex: () => <>Index</>,
  });
  ReactRouterView(r.at("logout"), () => <>Logout</>);
});

const history = createMemoryHistory();

let t: ReturnType<typeof ReactTesterRenderer.create>;
let emit: Emitter;
beforeEach(async () => {
  t = ReactTesterRenderer.create(
    <HistoryProvider history={history}>
      <TestContext>
        <ReactRouter router={TestRouter} />
      </TestContext>
    </HistoryProvider>
  );
  await Timeout(0);
});

it("expect to wrap by 2 wrappers.", async () =>
  test(l => l.find(TestRouter.at("a").at("aa").at("aaa"))!, "A/AA/AAA"));

it("expect to wrap by 2 wrappers to Index", async () =>
  test(l => l.at("hello", { name: "World" }), "Hello World! Index"));

it("expect to wrap by 2 wrappers to Logout", async () =>
  test(
    l => l.at("hello", { name: "World" }).at("logout"),
    "Hello World! Logout"
  ));

async function test(
  getLocation: (
    location: RouterLocation<RouterType<typeof TestRouter>>
  ) => AnyRouterLocation,
  expected
) {
  emit(RouterEvent, {
    type: "push",
    location: getLocation(RouterLocation.create(TestRouter, emit)),
  });
  await Timeout(0);
  expect(toString(t.toJSON())).toEqual(expected);

  function toString(obj) {
    if (Array.isArray(obj)) return obj.map(toString).join("");
    return obj.toString();
  }
}

function TestContext({ children }) {
  emit = useEmitter();
  return <>{children}</>;
}
