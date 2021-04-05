import { TsConfigPaths2 } from "@dabsi/typestack/TsConfigPaths2";

it("", async () => {
  const rootDir = "/worksacpe/projects";

  const isFile = async fileName => !/[\\\/]folder(|\.tsx?)$/.test(fileName);

  const parser = new TsConfigPaths2({
    isFile,
    isDir: async path => !(await isFile(path)),
    readFile: async () => "",
  });

  parser.build(rootDir + "/my", {
    "@main-project/*": ["../main/src/*"],
    "@sub-project/*": ["../sub/src/*"],
    "@my-project/*": ["src/*"],
  });

  expect(parser.resolveTsPath(rootDir + "/my/src/hello.ts")).toEqual(
    "@my-project/hello"
  );

  expect(parser.resolveTsPath(rootDir + "/my/src/hello/index.tsx")).toEqual(
    "@my-project/hello"
  );

  expect(await parser.resolveFsPath("@my-project/folder")).toEqual(
    rootDir + "/my/src/folder/index.ts"
  );
  expect(await parser.resolveFsPath("@my-project/file")).toEqual(
    rootDir + "/my/src/file.ts"
  );

  expect(await parser.resolveFsPath("@sub-project/folder")).toEqual(
    rootDir + "/sub/src/folder/index.ts"
  );
  expect(await parser.resolveFsPath("@sub-project/file")).toEqual(
    rootDir + "/sub/src/file.ts"
  );
});
