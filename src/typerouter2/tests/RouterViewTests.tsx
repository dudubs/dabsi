import { createTestRouters } from "@dabsi/typerouter2/tests/createTestRouters";
import { BaseRouterView } from "@dabsi/typerouter2/view/BaseRouterView";
import { buildRouterViews } from "@dabsi/typerouter2/view/buildRouterViews";
import { RouterView } from "@dabsi/typerouter2/view/RouterView";
import React from "react";
import ReactTestRenderer from "react-test-renderer";

const r = createTestRouters();

let rootFromCToBWrapper;
let rootFromCToBIndex;
let rootFromBWrapper;

RouterView.define(r.B, {
  $wrapper: ({ root, children }) => {
    rootFromBWrapper = root;
    return children;
  },
});
RouterView.define(r.C, [
  {
    $wrapper: ({ children }) => <>cw1{children}</>,
  },
  {
    $wrapper: ({ children }) => <>cw2{children}</>,
  },
  ({ children }) => <>ci{children}</>,
  {
    b: [
      {
        $wrapper: ({ root, children }) => {
          rootFromCToBWrapper = root;
          return <>bw{children}</>;
        },
      },
      ({ root, children }) => {
        rootFromCToBIndex = root;
        return <>bi{children}</>;
      },
      {
        a: ({ children }) => <>ai{children}</>,
      },
    ],
  },
]);

beforeEach(() => {
  buildRouterViews();
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

fit("expect to roots", () => {
  ReactTestRenderer.create(<BaseRouterView routerType={r.C} path={"/b"} />);

  expect(rootFromCToBWrapper).toBeInstanceOf(r.C);
  expect(rootFromCToBIndex).toBeInstanceOf(r.C);
  expect(rootFromBWrapper).toBeInstanceOf(r.B);
});
