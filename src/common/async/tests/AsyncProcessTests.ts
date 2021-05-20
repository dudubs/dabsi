import { Timeout } from "@dabsi/common/async/Timeout";
import { AsyncProcess2 } from "../AsyncProcess2";

let p: AsyncProcess2;

beforeEach(() => {
  p = new AsyncProcess2();
});

it("expect to pus and call", async done => {
  p.push(async () => {
    done();
  });
  await p.waitForLast();
});

it("expect to push and call deeper", async done => {
  p.push(async () => {
    p.push(async () => {
      p.push(async () => {
        done();
      });
    });
  });
  await p.waitForLast();
});

it("expect to wait and push", async done => {
  p.push(async tick => {
    expect(tick).toEqual(0);
    p.waitAndPush(async tick => {
      expect(tick).toEqual(1);
      p.waitAndPush(async tick => {
        expect(tick).toEqual(2);
        done();
      });
    });
  });
  await p.waitForLast();
});

it("expect to push and reject", async () => {
  p.push(async () => {
    p.waitAndPush(async () => {
      p.waitAndPush(async () => {
        await Timeout(10);
        throw new Error();
      });
    });
  });
  await expectAsync(p.waitForLast()).toBeRejected();
});

it("expect to wait and push deepr", async () => {
  p.push(async () => {
    p.push(async () => {
      p.push(async () => {
        throw new Error();
      });
    });
  });
  await expectAsync(p.waitForLast()).toBeRejected();
});
