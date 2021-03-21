import { Tick } from "@dabsi/common/async/Tick";
import { Ticker } from "@dabsi/common/async/Ticker";
import { Timeout } from "@dabsi/common/async/Timeout";

let ticker: Ticker;

beforeEach(() => {
  ticker = new Ticker();
});

it("expect to 1 tick", async () => {
  expect(await ticker.push(async () => 1)).toEqual(1);
});

it("expect to throws error", () => {
  return expectAsync(
    ticker.wait(
      ticker
        .push(async () => {
          const error = new Error("PUSHED_ERROR");
          error.toString = () => {
            console.log(new Error());
            return `xxx`;
          };
          throw error;
        })
        .then(unexpectedResult => {
          fail({ unexpectedResult });
        })
    )
  ).toBeRejected();
});

it("expect to nested ticks with some times", async () => {
  const test = async x =>
    await ticker.push(async () => {
      expect(ticker.currentTick).toEqual(1);

      await ticker.push(() => Timeout(10));
      expect(ticker.currentTick).toEqual(2);

      await ticker.push(() => Timeout(10));
      expect(ticker.currentTick).toEqual(3);

      return x;
    });
  expect(
    await ticker.wait(
      Promise.all([
        //
        test(1),
        test(2),
      ])
    )
  ).toEqual([1, 2]);
});

it("expect to nested ticks with diffrent times", async () => {
  let syncCallbacks: (() => void)[] = [];
  const sync = (max: number = 2) => {
    return new Promise<void>(resolve => {
      syncCallbacks.push(resolve);
      if (syncCallbacks.length === max) {
        const callbacks = syncCallbacks;
        syncCallbacks = [];
        for (const callback of callbacks) {
          callback();
        }
      }
    });
  };

  expect(
    await ticker.wait(
      Promise.all([
        ticker.push(async () => {
          expect(ticker.currentTick).toEqual(1);

          await ticker.push(async () => void 0);
          expect(ticker.currentTick).toEqual(2);

          await sync(2);
          expect(ticker.currentTick).toEqual(4);

          await ticker.push(async () => void 0);
          expect(ticker.currentTick).toEqual(5);

          return 1;
        }),
        ticker.push(async () => {
          expect(ticker.currentTick).toEqual(1);

          await Tick();
          await ticker.push(async () => void 0);
          expect(ticker.currentTick).toEqual(3);

          await ticker.push(async () => void 0);
          expect(ticker.currentTick).toEqual(4);

          await sync(2);
          expect(ticker.currentTick).toEqual(4);

          await ticker.push(async () => void 0);
          expect(ticker.currentTick).toEqual(5);

          return 2;
        }),
      ])
    )
  ).toEqual([1, 2]);
});
