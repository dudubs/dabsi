import {Command} from "../Command";
import {ExpressRPCHandler} from "../ExpressRPCHandler";
import {Service} from "../Service";
import {ExpressTester} from "./ExpressTests";


//

const TestCommand = Command<[number, number], number>();

const TestService = Service({test: TestCommand});

function fetchExpressTesterJson(payload) {
    return ExpressTester.fetchJSON(payload);
}

it('command', async () => {

    ExpressTester.setExpressHandler(
        ExpressRPCHandler(
            TestCommand.handle((a, b) => a + b)
        )
    );

    expect(await TestCommand
        .connect(fetchExpressTesterJson)
        (1, 2)
    ).toEqual(3);
})


it('service', async () => {
    ExpressTester.setExpressHandler(
        ExpressRPCHandler(TestService.handle({
            test: (a, b) => a + b
        }))
    );

    expect(await TestService
        .connect(fetchExpressTesterJson)
        .test(1, 2)
    ).toEqual(3);
})