import {Command} from "../Command";
import {CommandHandler} from "../CommandHandler";
import {ExpressTester} from "./ExpressTests";

const SayHelloCommand = Command<{ name: string }, string>();

export const SayHelloHandler = CommandHandler(SayHelloCommand, ({name}) => {
    return `Hello ${name}!`;
});


export const SayHello = SayHelloCommand.connect(ExpressTester.fetchJSON)


it('sanity', async () => {
    ExpressTester.setExpressHandler(SayHelloHandler);
    expect(await SayHello({name: "David"})).toEqual(`Hello David!`)
});


it('expect to result', () => {
    return expectAsync(Command<void, string>()
        .connect(async () => ({result: "OK"}))())
        .toBeResolvedTo("OK")
})

it('expect to error', () => {
    return expectAsync(Command<void, string>()
        .connect(async () => ({error: "OK"}))())
        .toBeRejected("OK")
});

