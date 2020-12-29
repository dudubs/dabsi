import { Timeout } from "@dabsi/common/async/Timeout";
import AbstractObjectPool from "@dabsi/common/patterns/object-pool/AbstractObjectPool";
let counter = 0;
class TestObjectPool extends AbstractObjectPool<any> {
  protected createInstance() {
    return { id: ++counter };
  }
  protected deleteInstance(conn: any) {}
}
const timeout = 20;
const waitToTimeout = () => Timeout(timeout + 1);
let pool: TestObjectPool;
beforeEach(() => {
  counter = 0;
  pool = new TestObjectPool({
    maxSize: 2,
    acquireTimeout: timeout,
    releaseTimeout: timeout,
  });
});
// log.enable("DEBUG");

it("expect to reuse object by acquire", async () => {
  const o1 = await pool.acquire();
  await pool.release(o1);
  expect(await pool.acquire()).toBe(o1);
  expect(await pool.acquire()).not.toBe(o1);
});

it("expect to reuse object by waiter", async () => {
  const o1 = await pool.acquire();
  const o2 = await pool.acquire();
  const w = pool.acquire();
  await pool.release(o1);
  expect(await w).toBe(o1);
});

it("expect to acquire timeout", async () => {
  const o1 = await pool.acquire();
  await waitToTimeout();
  expect(await pool.acquire()).toBe(o1);
});

it("expect to release timeout", async () => {
  const o1 = await pool.acquire();
  await pool.release(o1);
  await waitToTimeout();
  expect(await pool.acquire()).not.toBe(o1);
});
