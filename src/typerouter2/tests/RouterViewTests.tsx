import { createTestRouters } from "@dabsi/typerouter2/tests/createTestRouters";
import { BaseRouterView } from "@dabsi/typerouter2/view/BaseRouterView";

import { RouterView } from "@dabsi/typerouter2/view/RouterView";
import React from "react";
import ReactTestRenderer from "react-test-renderer";
import "..";
const r = createTestRouters();

let rootFromCToBWrapper;
let rootFromCToBIndex;
let rootFromBWrapper;

RouterView(r.B, $ =>
  $.wrap(({ root, children }) => {
    rootFromBWrapper = root;
    return children;
  })
);
RouterView(r.C, $ =>
  $
    //
    .wrap(({ children }) => <>cw1{children}</>)
    .wrap(({ children }) => <>cw2{children}</>)
    .index(({ children }) => <>ci{children}</>)
    .at("b", $ =>
      $
        //
        .wrap(({ root, children }) => {
          rootFromCToBWrapper = root;
          return <>bw{children}</>;
        })
        .index(({ root, children }) => {
          rootFromCToBIndex = root;
          return <>bi{children}</>;
        })
        .at("a", $ => $.index(({ children }) => <>ai{children}</>))
    )
);

beforeEach(() => {
  RouterView.build();
});

const testPath = path =>
  ReactTestRenderer.create(
    <BaseRouterView routerType={r.C} path={path} />
  ).toJSON() as any;

it("expect to c-wrappers with a-index", () => {
  expect(testPath("/")).toEqual(["cw1", "cw2", "ci"]);
});

it("expect to c & b wrappers with b-index", () => {
  expect(testPath("/b")).toEqual(["cw1", "cw2", "bw", "bi"]);
});

it("expect to c & b wrappers with a-index", () => {
  expect(testPath("/b/a")).toEqual(["cw1", "cw2", "bw", "ai"]);
});

it("expect to roots", () => {
  ReactTestRenderer.create(<BaseRouterView routerType={r.C} path={"/b"} />);

  expect(rootFromCToBWrapper).toBeInstanceOf(r.C);
  expect(rootFromCToBIndex).toBeInstanceOf(r.C);
  expect(rootFromBWrapper).toBeInstanceOf(r.B);
});
