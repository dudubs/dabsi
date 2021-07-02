import PathMap from "@dabsi/common/PathMap";

class TestPathMap extends PathMap<string, any> {
  getBaseKey(key: string) {
    // ^A -> A
    // ^^A -> ^A
    if (key.startsWith("^")) {
      return key.slice(1);
    }
  }
  atPathKey(key: string, pathKey: string) {
    return pathKey.toUpperCase();
  }
  getPathKeys(key) {
    switch (key.toLowerCase()) {
      case "^c":
        return ["^d"];
      case "^d":
        return ["^e"];
      case "^e":
        return ["^c"];
      default:
        return [];
    }
  }
}

let m: TestPathMap;

beforeAll(() => {
  m = new TestPathMap();
  const set = (p: string) => {
    const [key, ...path] = p.split(".");

    m.set(
      [key.toUpperCase(), path],
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

const testLook = (direction: "UP" | "DOWN" | "SUFFIX", path: string[]) => {
  const x = [...m.look(direction, ["A", path])].map(([key, path]) => {
    return path.length ? [key, path.join(".")].join(".") : key;
  });
  // console.log({ debug: x, direction });

  return expect(x);
};
it("expect to look SUFFIX", () => {
  testLook("SUFFIX", ["b", "^c", "^d"]).toEqual([
    "A.b.^c.^d",
    "B.^c.^d",
    "^C.^d",
    "^D",
    "D",
  ]);
});
it("expect to look UP", () => {
  testLook("UP", ["b", "^c", "^d"]).toEqual([
    "A.b.^c.^d",
    "A.b.^c",
    "A.b",
    "A",
    "B",
    "^C",
    "C",
    "^D",
    "D",
  ]);
});
it("expect to look DOWN", () => {
  testLook("DOWN", ["b", "^c"]).toEqual([
    "A.b.^c",
    "A.b.^c.^d",
    "A.b.^c.^d.^e",
    "A.b.^c.^d.^e.^c",
    "^E",
    "^E.^c",
    "^E.^c.^d",
    "^E.^c.^d.^e",
    "^D",
    "^D.^e",
    "^D.^e.^c",
    "^D.^e.^c.^d",
    "^C",
    "^C.^d",
    "^C.^d.^e",
    "^C.^d.^e.^c",
    "C",
    "D",
    "E",
  ]);
});
