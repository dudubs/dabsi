import {Waiter} from "../Waiter";

it('tryUndefined to resolve', async () => {
    const waiter = Waiter<void>();
    setImmediate(() => {
        waiter.resolve()
    })
    await waiter;
});
