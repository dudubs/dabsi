import { createMemoryHistory } from "history";
import React from "react";

import ReactTesterRenderer from "react-test-renderer";
import { Timeout } from "../common/async/Timeout";
import { useEmitter } from "../react/reactor/useEmitter";
import { ReactRouter } from "./ReactRouter";
import { ReactRouterView } from "./ReactRouterView";
import { Router, RouterType } from "./Router";
import { AnyRouterLocation, RouterLocation } from "./RouterLocation";

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
  ReactRouter(r, { wrap: ({ children }) => <>A{children}</> });
  r.at("aa", r => {
    ReactRouter(r, {
      wrap: ({ children }) => <>AA{children}</>,
      renderIndex: () => "index",
      renderDefault: p => `default ${p.route.defaultPath}`,
    });
    ReactRouter(r.at("aaa"), () => "AAA");
    ReactRouter(r.at("aab"), () => "AAB");
  });
}).at("hello", r => {
  ReactRouter(r, {
    wrap: p => {
      // @ts-expect-error
      p.location.params.x;
      return `Hello ${p.location.params.name}! ${p.children}`;
    },
    renderIndex: () => `Index`,
  });
  ReactRouter(r.at("logout"), () => `Logout`);
});

const history = createMemoryHistory();

testm(__filename, () => {
  let t: ReturnType<typeof ReactTesterRenderer.create>;
  let emit: (o) => void;
  beforeEach(async () => {
    t = ReactTesterRenderer.create(
      <TestContext>
        <ReactRouterView history={history} router={TestRouter} />
      </TestContext>
    );
    await Timeout(0);
  });

  it("expect to wrap by 2 wrappers.", async () =>
    test(l => l.find(TestRouter.at("a").at("aa").at("aaa"))!, [
      "A",
      "AA",
      "AAA",
    ]));

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
    emit(getLocation(RouterLocation.create(TestRouter)));
    await Timeout(0);
    expect(t.toJSON()).toEqual(expected);
  }
  function TestContext({ children }) {
    emit = useEmitter();
    return <>{children}</>;
  }
});
