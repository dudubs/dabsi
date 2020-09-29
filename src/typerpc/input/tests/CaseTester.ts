import { inspect } from "../../../logging";

type CaseTester<C> = {
  (title: string, config: C, callback?: () => void): CaseTester<C>;
  case(title: string, config: C, callback?: () => void): CaseTester<C>;
  test(callback: (config: C) => void): CaseTester<C>;
  test(title: string, callback: (config: C) => void): CaseTester<C>;
};

export function CaseTester<C>(name: string): CaseTester<C> {
  let configsToTest: [string, C][] = [];
  let lock = false;
  let isDefinedTestsCalled = false;
  tester.case = tester;
  tester.test = function (titleOrCallback, maybeCallback?) {
    let callback;
    if (maybeCallback) {
      callback = () => {
        it(titleOrCallback, maybeCallback);
      };
    } else {
      callback = titleOrCallback;
    }

    isDefinedTestsCalled = true;
    if (!configsToTest.length) throw new Error(`No ${name} to test.`);
    for (const [title, config] of configsToTest) {
      describe(name + ":" + title, () => {
        callback(config);
      });
    }
    return tester;
  };
  return tester;

  function tester(title: string, config: C, callback?: () => void) {
    if (lock) {
      throw new Error(`${name} is locked.`);
    }
    if (isDefinedTestsCalled) {
      isDefinedTestsCalled = false;
      configsToTest = [];
    }
    configsToTest.push([title, config]);
    if (callback) {
      lock = true;
      const _configsToTests = configsToTest;
      configsToTest = [[title, config]];
      try {
        callback();
      } finally {
        lock = false;
        configsToTest = _configsToTests;
        isDefinedTestsCalled = false;
      }
    }
    return tester;
  }
}

CaseTester.boolean = function (name: string): CaseTester<boolean> {
  return CaseTester<boolean>(name).case("true", true).case("false", false);
};

CaseTester.json = function <T>(name: string, options: T[]): CaseTester<T> {
  const t = CaseTester<T>(name);

  for (let option of options) {
    t.case(JSON.stringify(option), option);
  }
  return t;
};

export function testCase<T>(
  title: string,
  cases: T[],
  callback: (c: T) => void
) {
  for (const c of cases) {
    describe(`${title}:${inspect(c)}`, () => {
      callback(c);
    });
  }
}
