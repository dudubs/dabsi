import {Waiter} from "../Waiter";

it('expect to resolve', async () => {
    const waiter = Waiter<void>();
    setImmediate(() => {
        waiter.resolve()
    })
    await waiter;
});
