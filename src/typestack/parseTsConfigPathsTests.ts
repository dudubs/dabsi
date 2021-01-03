import createTsConfigPaths from "@dabsi/typestack/TsConfigPaths";

fit("", async () => {
  const rootDir = "/worksacpe/projects";

  const isFile = async fileName => !/[\\\/]folder(|\.tsx?)$/.test(fileName);

  const parser = createTsConfigPaths(
    rootDir + "/my",
    ".",
    {
      "@main-project/*": ["../main/src/*"],
      "@sub-project/*": ["../sub/src/*"],
      "@my-project/*": ["src/*"],
    },
    isFile
  );

  expect(parser.getTsPath(rootDir + "/my/src/hello.ts")).toEqual(
    "@my-project/hello"
  );

  expect(parser.getTsPath(rootDir + "/my/src/hello/index.tsx")).toEqual(
    "@my-project/hello"
  );

  expect(await parser.getFsPath("@my-project/folder")).toEqual(
    rootDir + "/my/src/folder/index.ts"
  );
  expect(await parser.getFsPath("@my-project/file")).toEqual(
    rootDir + "/my/src/file.ts"
  );

  expect(await parser.getFsPath("@sub-project/folder")).toEqual(
    rootDir + "/sub/src/folder/index.ts"
  );
  expect(await parser.getFsPath("@sub-project/file")).toEqual(
    rootDir + "/sub/src/file.ts"
  );
});
