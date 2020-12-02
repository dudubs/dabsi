import { createMemoryHistory } from "history";
import React from "react";

import ReactTesterRenderer from "react-test-renderer";
import { Timeout } from "../common/async/Timeout";
import { Emitter, useEmitter } from "../react/reactor/useEmitter";
import { ReactRouter } from "./ReactRouter";
import { ReactRouterView } from "./ReactRouterView";
import { Router, RouterType } from "./Router";
import { RouterEvent } from "./RouterEvent";
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

testm(__filename, () => {
  let t: ReturnType<typeof ReactTesterRenderer.create>;
  let emit: Emitter;
  beforeEach(async () => {
    t = ReactTesterRenderer.create(
      <TestContext>
        <ReactRouter history={history} router={TestRouter} />
      </TestContext>
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
});
