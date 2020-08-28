import {Command} from "../Command";
import {Service} from "../Service";
import {assertEvent} from "./assertEvent";


testm(__filename, () => {


    it('multiple connections to service', async () => {

        class MyService extends Service({
            test: Command<[], number>(),
            subService: Service({
                test: Command<[], number>()
            })
        }) {

        }

        const first = MyService.createRpcConnection(
            MyService.createRpcHandler({
                test: () => 1,
                subService: {
                    test: () => 1
                }
            })
        );

        const second = MyService.createRpcConnection(
            MyService.createRpcHandler({
                test: () => 2,
                subService: {
                    test: () => 2
                }
            })
        );

        expect(await first.test()).toEqual(1);
        expect(await second.test()).toEqual(2);
        expect(await first.subService.test()).toEqual(1);
        expect(await second.subService.test()).toEqual(2);


    });

    it('sanity', async () => {

        class TestService extends Service({

            test1: Command<number>(),
            test2: Command<number>()
        }) {

        }

        TestService.createRpcConnection(async payload => {
            assertEvent.emit({payload, test: "global"})
            return <any>null;
        })

        await TestService.test1(100);
        await TestService.test2(200);

        await TestService
            .createRpcConnection(async payload => {
                assertEvent.emit({payload, test: "instance"})
                return <any>null
            })
            .test1(300)

        assertEvent({test: "global", payload: ['test1', [100]]});
        assertEvent({test: "global", payload: ['test2', [200]]});
        assertEvent({test: "instance", payload: ['test1', [300]]});

    })

});

