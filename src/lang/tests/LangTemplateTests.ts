import { Lang } from "@dabsi/lang/Lang";
import { LangView } from "@dabsi/lang/LangView";

testm(__filename, () => {
  const HelloMsg = Lang`HELLO_${"name"}!`;

  it("expected to correct template key", () => {
    expect(HelloMsg.token).toEqual("HELLO_{name}!");
  });

  it("expected to react element", () => {
    expect(HelloMsg({ name: "World" })).toEqual(
      jasmine.objectContaining({
        type: LangView,
        props: jasmine.objectContaining({
          token: HelloMsg.token,
          props: jasmine.objectContaining({
            name: "World",
          }),
        }),
      })
    );
  });

  it("expected to template entry", () => {
    const [token, formatter] = HelloMsg`Hello ${"name"}!`;
    expect(formatter({ name: "World" })).toEqual("Hello World!");
    expect(token).toEqual(HelloMsg.token);
  });
});
