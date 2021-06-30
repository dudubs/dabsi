import { Timeout } from "@dabsi/common/async/Timeout";
import useAsyncProcess from "@dabsi/server/useAsyncProcess";

let logs: any[];
let idCounter: number;

beforeEach(() => {
  logs = [];
  idCounter = 0;
});
const t = () => {
  let timeout = 0;
  const id = idCounter++;
  let bg = 0;
  let fg = 0;
  const log = (extra?) => {
    const dx = bg - fg;
    expect(dx).toEqual(0);
    logs.push({ id, timeout: timeout++, bg, fg, dx, ...extra });
  };
  return useAsyncProcess(
    {
      onComplete: () => {
        log({ on: "complete" });
      },
      onBackground: () => {
        bg++;
      },
      onForegorund: () => {
        fg++;
      },
    },
    async () => {
      log();
      await Timeout(10);
      log();
      await Timeout(10);
      log();
      await Timeout(10);
      log();
      await Timeout(10);
      log();
      return logs;
    }
  );
};

it("single", () => t());

it("multiple", () =>
  Promise.all([
    //
    t(),
    t(),
    t(),
  ]));
