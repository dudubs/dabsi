import { Router } from "./Router";
import { RouterLocation } from "./RouterLocation";

describe(__filename, () => {
  const baseRouter = Router({
    a: Router({
      aa: Router({
        aaa: Router(),
        aab: Router(["p"]),
      }),
      ab: Router(),
    }),
    b: Router({
      ba: Router({
        baa: Router(),
      }),
      bb: Router({}),
    }),
  });
  const router = baseRouter.create();
  const location = RouterLocation.create(router);

  const a = baseRouter.at("a");
  const aa = a.at("aa");
  const aaa = aa.at("aaa");

  describe("base-router", () => {
    test(baseRouter);
  });

  describe("router", () => {
    test(router);
  });

  // test(router);

  function test(r: typeof baseRouter) {
    const a = r.at("a");

    // @ts-expect-error
    r.at("x");

    const aa = a.at("aa");

    // @ts-expect-error
    aa.at("x");

    const aaa = aa.at("aaa");

    // @ts-expect-error
    aaa.at("x");

    it("expect to find a", () => {
      expect(location.find(a)).toBeDefined();
    });
    it("expect to not find aab", () => {
      expect(location.find(aa.at("aab"))).toBeUndefined();
    });
    it("expect to find aa", () => {
      expect(location.find(aa)).toBeDefined();
    });
    it("expect to find aaa", () => {
      expect(location.find(aaa)).toBeDefined();
    });
    it("expect to find baa from aaa", () => {
      expect(
        location.find(aaa)!.find(r.at("b").at("ba").at("baa"))
      ).toBeDefined();
    });
  }

  it("expect router to be base-router.", () => {
    expect(baseRouter.create().isRouterOf(baseRouter)).toBeTrue();
    expect(baseRouter.create().create().isRouterOf(baseRouter)).toBeTrue();
  });
  it("expect child-router to be base-router of child", () => {
    expect(
      baseRouter.create().at("a").isRouterOf(baseRouter.at("a"))
    ).toBeTrue();
  });
  it("expect router to not be base-router.", () => {
    expect(Router().create().isRouterOf(baseRouter)).toBeFalse();
  });
});
