import { Store } from "@dabsi/store";
import { RouterLocation } from "@dabsi/typerouter/location";
import { getRouteByPath } from "@dabsi/typerouter/route";
import Router, { RouterType } from "@dabsi/typerouter/router";
import { RouterView } from "@dabsi/typerouter/view";
import { renderRoute } from "@dabsi/typerouter/view/renderRoute";
import EmptyFragment from "@dabsi/view/react/utils/EmptyFragment";
import React from "react";
import * as ReactTestRenderer from "react-test-renderer";

const renderToJSON = (element: React.ReactElement): any =>
  ReactTestRenderer.create(element).toJSON();

const renderToString = element => {
  return toString(renderToJSON(element));
  function toString(node: ReactTestRenderer.ReactTestRendererJSON) {
    if (node && typeof node === "object") {
      if (Array.isArray(node)) {
        return node.map(toString).join("");
      }
      return `<${node.type}>${node.children?.map(toString).join("")}</${
        node.type
      }>`;
    }
    return String(node);
  }
};

const router = Router({
  wrapperTests: Router({
    section: Router({
      subSection: Router({
        page: Router(),
      }),
    }),
  }),
  defaultTests: Router({
    main: Router(),
  }),
  errorTests: Router({
    main: Router(),
    post: Router(["postId"]),
  }),
});

const location = new RouterLocation<RouterType<typeof router>>(
  router,
  null,
  undefined,
  undefined,
  () => void 0
);

router
  .at("wrapperTests", router => {
    router.at("section", router => {
      RouterView.define(router, { wrapper: true }, ({ children }) => (
        <>section.wrapper1; {children}</>
      ));
      RouterView.define(router, { wrapper: true }, ({ children }) => (
        <>section.wrapper2; {children}</>
      ));
      RouterView.define(router, () => <>section.index;</>);
      router.at("subSection", router => {
        RouterView.define(router, { wrapper: true }, ({ children }) => (
          <>subSection.wrapper1; {children}</>
        ));
        RouterView.define(router, { wrapper: true }, ({ children }) => (
          <>subSection.wrapper2; {children}</>
        ));
        RouterView.define(router, () => <>subSection.index;</>);
      });
    });
  })
  .at("defaultTests", router => {
    RouterView.define(router, { defaultHandling: true }, ({ route }) => (
      <>
        default.{route.type}; default:{route.path}
      </>
    ));
    RouterView.define(router.at("main"), {}, ({ route }) => (
      <>main-under-default.${route.type}</>
    ));
  })
  .at("errorTests", router => {
    RouterView.define(router, { errorHandling: true }, ({ route }) => (
      <>error.{route.type};</>
    ));
  });

const testRouteComponent = async ({
  path,
  expectedRouteType,
  expectedPattern = null as null | RegExp,
  expectedKws = null as null | string[],
  debug = false,
}) => {
  const route = getRouteByPath(location, path);
  expect(route.type).toEqual(expectedRouteType);
  const text = renderToString(
    await renderRoute(route, Store.const(null), EmptyFragment)
  );
  const kws = [...text.matchAll(/\s*([^\;]+)\;/g)].map(g => g[1]);

  debug && console.log({ text, kws });
  expectedPattern && expect(text).toMatch(expectedPattern);

  if (expectedKws) {
    expect(kws).toEqual(expectedKws);
  }
};

describe("expect to wrap", () => {
  it("index", () => {
    testRouteComponent({
      path: location.at("wrapperTests").at("section").at("subSection").path,
      expectedRouteType: "INDEX",

      expectedKws: [
        "section.wrapper1",
        "section.wrapper2",
        "subSection.wrapper1",
        "subSection.wrapper2",
        "subSection.index",
      ],
    });
  });
});
describe("expect to render error because", () => {
  const testLocationPath = location.at("errorTests").path;
  it("error", () =>
    testRouteComponent({
      path: testLocationPath + "/post",
      expectedRouteType: "ERROR",
      expectedPattern: /error\.ERROR;/,
    }));

  it("index", () =>
    testRouteComponent({
      path: testLocationPath,
      expectedRouteType: "INDEX",
      expectedPattern: /error\.INDEX;/,
    }));
});

describe("expect to render default because", () => {
  const testLocation = location.at("defaultTests");

  it("invalid path", () =>
    testRouteComponent({
      path: testLocation.path + "/invalid",
      expectedRouteType: "DEFAULT",
      expectedPattern: /default\.DEFAULT;/,
    }));

  it("index", () =>
    testRouteComponent({
      path: testLocation.path,
      expectedRouteType: "INDEX",
      expectedPattern: /default\.INDEX;/,
    }));
});
