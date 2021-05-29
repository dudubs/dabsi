import { TsConfigPaths2 } from "@dabsi/typestack/TsConfigPaths2";

const rootDir = "/worksacpe/projects";

let parser: TsConfigPaths2;

beforeAll(() => {
  const isFile = async fileName => !/[\\\/]folder(|\.tsx?)$/.test(fileName);

  parser = new TsConfigPaths2({
    isFile,
    isDir: async path => !(await isFile(path)),
    readJsonFile: async () => ({}),
  });

  parser.build(rootDir + "/my", {
    "@main-project/*": ["../main/src/*"],
    "@sub-project/*": ["../sub/src/*"],
    "@my-project/*": ["src/*"],
  });
});

describe("fs-to-ts-path", () => {
  const test = (fsPath, tsPath) => {
    it(`expect resolve ${fsPath} to ${tsPath}`, async () => {
      expect(await parser.resolveTsPath(rootDir + fsPath)).toEqual(tsPath);
    });
  };
  test("/my/src/hello.ts", "@my-project/hello");
  test("/my/src/hello/index.tsx", "@my-project/hello");
});

describe("ts-to-fs-path", () => {
  const test = (tsPath, fsPath) => {
    it(`expect resolve ${tsPath} to ${fsPath}`, async () => {
      expect(await parser.resolveFsPath(tsPath)).toEqual(rootDir + fsPath);
    });
  };
  test("@my-project/folder", "/my/src/folder/index.ts");
  test("@my-project/file", "/my/src/file.ts");
  test("@sub-project/folder", "/sub/src/folder/index.ts");
  test("@sub-project/file", "/sub/src/file.ts");
});
