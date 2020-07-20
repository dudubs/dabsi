import {Waiter} from "../Waiter";

testm(__filename,()=>{
    it('expected to resolve', async () => {
        const waiter = Waiter<void>();
        setImmediate(() => {
            waiter.resolve()
        })
        await waiter;
    });

})
