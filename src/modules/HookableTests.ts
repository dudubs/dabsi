import { Timeout } from "@dabsi/common/async/Timeout";
import { Fn } from "@dabsi/common/typings2/Fn";
import { Hookable } from "@dabsi/modules/Hookable";

let h: Hookable<any>;

describe("", () => {
  let events: any[];
  beforeEach(() => {
    events = [];
  });

  it("async is before", async () => {
    h = Hookable(() => {
      events.push(2);
    });
    await h({
      before: async () => {
        events.push(1);
        await Timeout(0);
      },
      after: () => {
        events.push(3);
      },
    });
  });
  afterEach(async () => {
    await h.invoke();
    expect(events).toEqual([...events].sort());
  });
});
