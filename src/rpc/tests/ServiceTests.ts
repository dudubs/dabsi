import {Command} from "../Command";
import {Service} from "../Service";
import {assertEvent} from "./assertEvent";



testm(__filename, () => {

    it('sanity', async () => {

        class TestService extends Service({

            test1: Command<number>(),
            test2: Command<number>()
        }) {

        }

        TestService.connect(async payload => {
            assertEvent.emit({payload, test: "global"})
            return <any>null;
        })

        await TestService.test1(100);
        await TestService.test2(200);

        await TestService
            .connect(async payload => {
                assertEvent.emit({payload, test: "instance"})
                return <any>null
            })
            .test1(300)

        assertEvent({test: "global", payload: ['test1', [100]]});
        assertEvent({test: "global", payload: ['test2', [200]]});
        assertEvent({test: "instance", payload: ['test1', [300]]});

    })

});

