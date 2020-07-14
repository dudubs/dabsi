import {Waiter} from "../Waiter";

it('expected to resolve', async () => {
    const waiter = Waiter<void>();
    setImmediate(() => {
        waiter.resolve()
    })
    await waiter;
});
