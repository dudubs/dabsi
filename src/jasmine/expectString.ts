export default (
  text: string,
  {
    startsWith: expectedStart,
    endsWith: expectedEnd,
    contains: expectedContain,
  }: { startsWith?: string; endsWith?: string; contains?: string } = {}
) => {
  if (typeof expectedStart === "string" && !text.startsWith(expectedStart)) {
    fail(
      `expect ${JSON.stringify(text)} will starts with ${JSON.stringify(
        expectedStart
      )}.`
    );
  }

  if (typeof expectedEnd === "string" && !text.endsWith(expectedEnd)) {
    fail(
      `expect ${JSON.stringify(text)} will ends with ${JSON.stringify(
        expectedEnd
      )}.`
    );
  }
  if (
    typeof expectedContain === "string" &&
    text.indexOf(expectedContain) === -1
  ) {
    fail(
      `expect ${JSON.stringify(text)} will contains ${JSON.stringify(
        expectedContain
      )}.`
    );
  }
};
