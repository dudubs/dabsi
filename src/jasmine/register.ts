import { _testm } from "./testm";

declare global {
  export let testm: typeof _testm;
}

global["testm"] = _testm;

beforeEach(() => {
  jasmine.addMatchers(
    require("jasmine-diff")(jasmine, {
      colors: true,
    })
  );
});
