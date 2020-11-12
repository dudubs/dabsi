import { createMemoryHistory, History } from "History";
import * as React from "react";
import * as TestRenderer from "react-test-renderer";
import { ReactTestRenderer } from "react-test-renderer";
import { Timeout } from "../../common/async/Timeout";
import { EmptyFragment } from "../../react/utils/EmptyFragment";
import { ReactRouter } from "../ReactRouter";
import { ReactRouterContentView } from "../ReactRouterContentView";
import { ReactRouterView } from "../ReactRouterView";
import { Router } from "../Router";

testm(__filename, () => {
  let history: History;
  let t: ReactTestRenderer;

  const r = Router()
    .use(ReactRouter)
    .route({
      a: Router({
        aa: Router({}),
        ab: Router({}),
      }),
      b: Router({
        ba: Router(),
      }),
      wrapByPlugin: Router({
        a: Router(),
      }),
    });

  const rp = [
    r.plugin(r => {
      r.at("a").wrap(props => {
        return <>wrap {props.children}</>;
      });

      r.at("a").render(p => {
        return <>a</>;
      });

      r.at("b").renderDefault(props => {
        return (
          <>
            default {props.location.path} of {props.rootPath}
          </>
        );
      });

      r.render(props => {
        return <>index</>;
      });

      r.at("a")
        .at("aa")
        .render(props => {
          return <>hello</>;
        });
    }),
  ];

  beforeAll(async () => {
    history = createMemoryHistory();

    try {
      t = TestRenderer.create(
        <ReactRouterView history={history} router={r} plugins={rp}>
          <ReactRouterContentView />
        </ReactRouterView>
      );
    } catch (error) {
      console.log({ error });
    }
    await Timeout(0);
  });

  it("expect to default b of b", async () => {
    expect(await getPathJSON("/b/hello")).toEqual("default /b of /b/hello");
  });

  it("expect to default b of ba", async () => {
    expect(await getPathJSON("/b/ba/hello")).toEqual(
      "default /b/ba of /b/ba/hello"
    );
  });

  it("expect to wrapper", async () => {
    expect(await getPathJSON("/a/aa")).toEqual("wrap hello");
  });

  it("expect to wrapper", async () => {
    expect(await getPathJSON("/a")).toEqual("wrap a");
  });

  async function getPathJSON(path: string) {
    await Timeout(0);
    history.push(path);
    await Timeout(0);

    const j = t.toJSON() as any;
    if (typeof j === "string") return j;
    return j.join("");
  }
});

function typingTests() {
  const router = Router()
    .use(ReactRouter)
    .route({
      a: Router({
        aa: Router({
          aaa: Router({}),
          aab: Router({}),
          aac: Router(["x"]),
        }),
        ab: Router({}),
        ac: Router(["x"]),
      }),
      b: Router(),
    });

  router
    .at("a")
    .at("aa")
    .at("aaa")
    .render(props => {
      // @ts-expect-error
      props.location.parent.at("x");

      // @ts-expect-error
      props.location.stack.atStack("x");

      props.location.atStack("a");
      props.location.atStack("aa");
      props.location.atStack("aaa");

      props.location.parent.at("aab");

      // @ts-expect-error
      props.location.parent.at("aac");

      props.location.parent.at("aac", { x: 1 });

      return EmptyFragment;
    });
}
