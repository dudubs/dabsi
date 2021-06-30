import PathMap from "@dabsi/common/PathMap";

class TestPathMap extends PathMap<string, any> {
  getBaseKey(key: string) {
    // ^A -> A
    // ^^A -> ^A
    if (key.startsWith("^")) {
      return key.slice(1);
    }
  }
  getChildKey(key: string, pathKey: string) {
    return pathKey.toUpperCase();
  }
}

let m: TestPathMap;

const testFindSuffix = (p: string) => {
  const [key, ...path] = p.split(".");
  return [...new Set(m.findSuffix(key.toUpperCase(), path))];
};
const testFindPrefix = (p: string) => {
  const [key, ...path] = p.split(".");
  return [...new Set(m.findPrefix(key.toUpperCase(), path))];
};
beforeAll(() => {
  m = new TestPathMap();
  const set = (p: string) => {
    const [key, ...path] = p.split(".");

    m.set(
      key.toUpperCase(),
      path,
      p.replace(/^[^\.]+/, x => x.toUpperCase())
    );
  };

  set("a.b.c.d.e");
  set("b.c.d.e");
  set("c.d.e");
  set("d.e");
  set("e");
  set("d");
  set("c");
  set("b");
  set("a");
  set("a.b");
});

it("expect to get by suffix", () => {
  expect(testFindSuffix("a.b.c.d.e")).toEqual([
    "A.b.c.d.e",
    "B.c.d.e",
    "C.d.e",
    "D.e",
    "E",
  ]);
  expect(testFindSuffix("c.d.e")).toEqual(["C.d.e", "D.e", "E"]);
  expect(testFindSuffix("e")).toEqual(["E"]);
  expect(testFindSuffix("c.d")).toEqual(["D"]);
});

it("expect to find by-base-key", () => {
  expect(testFindSuffix("x.^^e")).toEqual(["E"]);
});

it("expect to find by prefix", () => {
  expect(testFindPrefix("a.b.c.d.e")).toEqual([
    "A",
    "A.b",
    "B",
    "C",
    "D",
    "A.b.c.d.e",
    "B.c.d.e",
    "C.d.e",
    "D.e",
    "E",
  ]);
});
